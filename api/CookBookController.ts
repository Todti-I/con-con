import { RecipeData } from 'con-con/types/recipes';
import BaseController from './BaseController';

export default class CookBookController extends BaseController {
  private recipesCache = new Map<string, RecipeData>();

  async getRecipes(offset: number, limit: number): Promise<RecipeData[]> {
    return this.get('/cookbook', { offset, limit });
  }

  async getRecipe(recipeId: string): Promise<RecipeData> {
    if (this.recipesCache.get(recipeId)) {
      return this.recipesCache.get(recipeId)!;
    }

    try {
      const recipe = await this.get<RecipeData>(`/cookbook/${recipeId}`);
      this.recipesCache.set(recipeId, recipe);
      return recipe;
    } catch {
      const recipe = await this.get<RecipeData>(`/recipes/${recipeId}`);
      this.recipesCache.set(recipeId, recipe);
      return recipe;
    }
  }

  async getRecipesWithSearch(params: {
    offset: number;
    limit: number;
    title?: string;
  }): Promise<RecipeData[]> {
    if (params.title) {
      return this.get('/cookbook/search', params);
    }

    return this.getRecipes(params.offset, params.limit);
  }
}
