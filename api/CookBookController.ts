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
    includeIngredients?: string[];
    excludeIngredients?: string[];
  }): Promise<RecipeData[]> {
    if (params.title || params.includeIngredients?.length) {
      const url =
        `/cookbook/search?offset=${params.offset}&limit=${params.limit}` +
        (params.includeIngredients || []).reduce(
          (r, id, i) => `${r}&includeIngredients[${i}]=${id}`,
          ''
        ) +
        (params.excludeIngredients || []).reduce(
          (r, id, i) => `${r}&excludeIngredients[${i}]=${id}`,
          ''
        ) +
        (params.title ? `&title=${params.title}` : '');

      return this.get(url);
    }

    return this.getRecipes(params.offset, params.limit);
  }
}
