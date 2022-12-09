import { RecipeData } from 'con-con/types/recipes';
import shuffleArray from 'con-con/utils/shuffle-array';
import BaseController from './BaseController';

export default class RecipesController extends BaseController {
  private cachedRecipes: Map<number, RecipeData[]> = new Map();

  async getRecipes(
    mealTypeId: number,
    isVegetarian?: boolean
  ): Promise<RecipeData[]> {
    if (this.cachedRecipes.has(mealTypeId)) {
      return shuffleArray(this.cachedRecipes.get(mealTypeId) || []);
    }

    const recipes = await this.get<RecipeData[]>('/recipes', {
      mealType: mealTypeId,
      isVegetarian: isVegetarian || undefined,
    });
    this.cachedRecipes.set(mealTypeId, recipes);

    console.log(recipes.length);

    return shuffleArray(recipes);
  }

  async getRecipe(recipeId: number): Promise<RecipeData> {
    return this.get(`/recipes/${recipeId}`);
  }
}
