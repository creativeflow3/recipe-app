const searchRecipes = async (searchTerm: string, page: number) => {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error('API key not found');
  }

  const url = new URL(
    `${process.env.SPOONACULAR_URL}/recipes/complexSearch`,
  );

  const queryParams = {
    apiKey,
    query: searchTerm,
    number: '10',
    offset: (page * 10).toString(),
  };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url);
    const resultsJson = await searchResponse.json();

    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};

const getRecipeSummary = async (recipeId: string) => {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error('API key not found');
  }

  const url = new URL(
    `${process.env.SPOONACULAR_URL}/recipes/${recipeId}/summary`,
  );

  const params = {
    apiKey,
  };

  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url);
    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }
};

const getFavoriteRecipesByIDs = async (ids: string[]) => {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error('API key not found');
  }

  const url = new URL(
    `${process.env.SPOONACULAR_URL}/recipes/informationBulk`,
  );

  const params = {
    apiKey,
    ids: ids.join(','),
  };

  url.search = new URLSearchParams(params).toString();
  console.log(url, 'url');
  try {
    const response = await fetch(url);
    const json = await response.json();

    return { results: json };
  } catch (error) {
    console.log(error);
  }
};

export { searchRecipes, getRecipeSummary, getFavoriteRecipesByIDs };
