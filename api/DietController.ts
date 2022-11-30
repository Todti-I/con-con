import RecipeData from 'con-con/types/recipe-data';
import BaseController from './BaseController';

export default class DietController extends BaseController {
  async getDiet(kilocalories: number): Promise<RecipeData[]> {
    return this.get('/diet', { calories: kilocalories });
  }
}
