import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import * as RecipeAPI from './recipe-api';
import 'dotenv/config';

const app = express();
const prismaClient = new PrismaClient();
app.use(express.json());

app.use(cors());

app.get(
  '/api/recipes/search',
  async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string) || 1;

    const results = await RecipeAPI.searchRecipes(searchTerm, page);
    res.json(results);
  },
);

app.get(
  '/api/recipes/:recipeId/summary',
  async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId as string;

    const results = await RecipeAPI.getRecipeSummary(recipeId);
    res.json(results);
  },
);

app.post(
  '/api/recipes/favorite',
  async (req: Request, res: Response) => {
    const recipeId = req.body.recipeId;

    try {
      const favoriteRecipe =
        await prismaClient.favoriteRecipes.create({
          data: {
            recipeId: recipeId,
          },
        });
      return res.status(201).json(favoriteRecipe);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Oops' });
    }
  },
);

app.get(
  '/api/recipes/favorite',
  async (req: Request, res: Response) => {
    try {
      const recipes = await prismaClient.favoriteRecipes.findMany();
      // 'recipes/informationBulk'
      const recipeIds = recipes.map((recipe) =>
        recipe.recipeId.toString(),
      );
      console.log(recipeIds);
      const favorites = await RecipeAPI.getFavoriteRecipesByIDs(
        recipeIds,
      );
      return res.status(200).json(favorites);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'There was an error' });
    }
  },
);

app.delete(
  '/api/recipes/favorite',
  async (req: Request, res: Response) => {
    const recipeId = req.body.recipeId;

    try {
      await prismaClient.favoriteRecipes.delete({
        where: {
          recipeId: recipeId,
        },
      });
      return res.status(204).send();
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Oops' });
    }
  },
);

app.listen(5000, () => {
  console.log('server running on port 5000');
});
