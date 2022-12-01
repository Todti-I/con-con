import { RecipeData } from 'con-con/types/recipes';
import shuffleArray from 'con-con/utils/shuffle-array';
import BaseController from './BaseController';

export default class RecipesController extends BaseController {
  private cachedRecipes: RecipeData[] = [];

  async getRecipes(): Promise<RecipeData[]> {
    if (this.cachedRecipes.length > 0) {
      return shuffleArray(this.cachedRecipes);
    }

    const recipes = await this.get<RecipeData[]>('/recipes');
    this.cachedRecipes = recipes;

    return shuffleArray(recipes);
  }

  async getRecipe(recipeId: number): Promise<RecipeData> {
    return this.get(`/recipes/${recipeId}`);
  }
}
