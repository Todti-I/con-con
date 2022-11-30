import RecipeData from 'con-con/types/recipe-data';
import BaseController from './BaseController';

export default class RecipesController extends BaseController {
  async getRecipes(): Promise<RecipeData[]> {
    return this.get('/recipes');
  }

  async getRecipe(recipeId: number): Promise<RecipeData> {
    return this.get(`/recipes/${recipeId}`);
  }
}
