import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Recipe } from '../types';

type Props = {
  recipe: Recipe;
  onClick: () => void;
  onFavoriteButtonClick: (recipe: Recipe) => void;
  isFavorite: boolean;
};
const RecipeCard = ({
  recipe,
  onClick,
  onFavoriteButtonClick,
  isFavorite,
}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} onClick={onClick} />
      <div className="recipe-card-title">
        <span
          onClick={(event) => {
            event.stopPropagation();
            onFavoriteButtonClick(recipe);
          }}
        >
          {isFavorite ? (
            <AiFillHeart size={25} color="red" />
          ) : (
            <AiOutlineHeart size={25} color="red" />
          )}
        </span>
        <h3 onClick={onClick}>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
