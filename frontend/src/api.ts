import { Recipe } from './types';

export const searchReecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL(
    `${import.meta.env.VITE_API_BASE_URL}/api/recipes/search`
  );
  baseUrl.searchParams.append('searchTerm', searchTerm);
  baseUrl.searchParams.append('page', page.toString());

  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }

  return response.json();
};

export const getRecipeSummary = async (recipeId: string) => {
  const baseUrl = new URL(
    `${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipeId}/summary`
  );
  const url = new URL(baseUrl);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }

  return response.json();
};

export const getFavoriteRecipes = async () => {
  const baseUrl = new URL(
    `${import.meta.env.VITE_API_BASE_URL}/api/recipes/favorite`
  );
  const url = new URL(baseUrl);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }

  return response.json();
};

export const addFavoriteRecipe = async (recipe: Recipe) => {
  const baseUrl = new URL(
    `${import.meta.env.VITE_API_BASE_URL}/api/recipes/favorite`
  );
  const body = {
    recipeId: recipe.id,
  };
  const url = new URL(baseUrl);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }

  return response.json();
};

export const removeFavoriteRecipe = async (recipe: Recipe) => {
  const baseUrl = new URL(
    `${import.meta.env.VITE_API_BASE_URL}/api/recipes/favorite`
  );
  const body = {
    recipeId: recipe.id,
  };
  const url = new URL(baseUrl);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }

  return response.json();
};
