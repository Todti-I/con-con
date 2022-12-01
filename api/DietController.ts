import { RecipeData } from 'con-con/types/recipes';
import BaseController from './BaseController';

export default class DietController extends BaseController {
  async getDiet(kilocalories: number): Promise<RecipeData[]> {
    try {
      return await this.get('/diet', { calories: kilocalories });
    } catch {
      return [];
    }
  }
}
