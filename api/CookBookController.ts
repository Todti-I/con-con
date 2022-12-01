import { RecipeData } from 'con-con/types/recipes';
import BaseController from './BaseController';

export default class CookBookController extends BaseController {
  async getRecipes(offset: number, limit: number): Promise<RecipeData[]> {
    return this.get('/cookbook', { offset, limit });
  }

  async getRecipe(recipeId: string): Promise<RecipeData> {
    return this.get(`/cookbook/${recipeId}`);
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
