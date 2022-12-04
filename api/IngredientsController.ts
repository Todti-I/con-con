import { IngredientData } from 'con-con/types/recipes';
import BaseController from './BaseController';

export default class IngredientsController extends BaseController {
  private cachedIngredients: IngredientData[] = [];

  async getIngredients(): Promise<IngredientData[]> {
    if (this.cachedIngredients.length > 0) {
      return this.cachedIngredients;
    }

    const ingredients = await this.get<IngredientData[]>('/ingredients');
    this.cachedIngredients = ingredients;

    return ingredients;
  }

  async getIngredient(ingredientId: number): Promise<IngredientData> {
    return this.get(`/ingredients/${ingredientId}`);
  }
}
