import { type FormEvent, useState, useRef, useEffect } from 'react';

import * as api from './api';
import { Recipe } from './types';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';

import './App.css';
import { AiOutlineSearch } from 'react-icons/ai';

type Tabs = 'search' | 'favorites';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>('search');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favRecipes = await api.getFavoriteRecipes();
        setFavoriteRecipes(favRecipes.results);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFavoriteRecipes();
  }, []);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipesRetured = await api.searchReecipes(searchTerm, 1);
      setRecipes(recipesRetured.results);
      pageNumber.current = 1;
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchReecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (e) {
      console.log(e);
    }
  };

  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavoriteRecipe(recipe);
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    } catch (e) {
      console.log(e);
    }
  };

  const removeFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavoriteRecipe(recipe);

      // remove from favorites array
      const updatedRecipes = favoriteRecipes.filter(
        (fav) => recipe.id !== fav.id
      );

      setFavoriteRecipes(updatedRecipes);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <img src="/hero-image.png" />
        <h1 className="title">My Recipe App</h1>
      </div>
      <div className="tabs">
        <h2
          className={selectedTab === 'search' ? 'tab-active' : ''}
          onClick={() => setSelectedTab('search')}
        >
          Recipe Search
        </h2>
        <h2
          className={selectedTab === 'favorites' ? 'tab-active' : ''}
          onClick={() => setSelectedTab('favorites')}
        >
          Favorites
        </h2>
      </div>
      {selectedTab === 'search' && (
        <>
          <form onSubmit={(event) => handleSearchSubmit(event)}>
            <input
              type="text"
              required
              placeholder="Enter a search term"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="search-submit-input"
            />
            <button type="submit" className="search-submit-button">
              <AiOutlineSearch size={40} />
            </button>
          </form>
          <div className="recipe-grid">
            {recipes.map((recipe, index) => {
              const isFavorite = favoriteRecipes.some(
                (favRecipe) => recipe.id === favRecipe.id
              );
              return (
                <RecipeCard
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  key={index}
                  onFavoriteButtonClick={
                    isFavorite ? removeFavoriteRecipe : addFavoriteRecipe
                  }
                  isFavorite={isFavorite}
                />
              );
            })}
          </div>
          <button className="view-more-button" onClick={handleViewMore}>
            View More
          </button>
        </>
      )}
      {selectedTab === 'favorites' && favoriteRecipes.length > 0 && (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe, index) => (
            <RecipeCard
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              key={index}
              onFavoriteButtonClick={removeFavoriteRecipe}
              isFavorite={true}
            />
          ))}
        </div>
      )}
      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  );
};

export default App;
