import { RecipeData } from 'con-con/types/recipes';
import BaseController from './BaseController';

export default class CookBookController extends BaseController {
  async getRecipes(offset: number, limit: number): Promise<RecipeData[]> {
    return this.get('/cookbook', { offset, limit });
  }

  async getRecipe(recipeId: number): Promise<RecipeData> {
    return this.get(`/cookbook/${recipeId}`);
  }
}
