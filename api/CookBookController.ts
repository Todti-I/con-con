import {
  CookingTimeFilter,
  KilocaloriesFilter,
  RecipeData,
  SearchRecipesData,
} from 'con-con/types/recipes';
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

  async getRecipesWithSearch(
    offset: number,
    limit: number,
    params: SearchRecipesData,
    isVegetarian?: boolean
  ): Promise<RecipeData[]> {
    const {
      title,
      mealTypeFilter,
      kilocaloriesFilter,
      cookingTimeFilter,
      includeIngredientIds,
      excludeIngredientIds,
    } = params;

    return this.get('/cookbook/search', {
      offset,
      limit,
      title,
      includeIngredients: includeIngredientIds,
      excludeIngredients: excludeIngredientIds,
      mealTypes: mealTypeFilter,
      kilocaloriesMoreThan: convertFilter(kilocaloriesFilter, 'calories')?.min,
      kilocaloriesLessThan: convertFilter(kilocaloriesFilter, 'calories')?.max,
      timeMoreThan: convertFilter(cookingTimeFilter, 'cookingTime')?.min,
      timeLessThan: convertFilter(cookingTimeFilter, 'cookingTime')?.max,
      isVegetarian: isVegetarian || undefined,
    });
  }
}

const kilocaloriesFilterConvertors: Record<
  KilocaloriesFilter,
  { min?: number; max?: number }
> = {
  [KilocaloriesFilter.To200]: { max: 200 },
  [KilocaloriesFilter.From200To400]: { min: 200, max: 400 },
  [KilocaloriesFilter.From400]: { min: 400 },
};

const cookingTimeFilterConvertors: Record<
  CookingTimeFilter,
  { min?: number; max?: number }
> = {
  [CookingTimeFilter.To15]: { max: 15 },
  [CookingTimeFilter.To30]: { max: 30 },
  [CookingTimeFilter.To45]: { max: 45 },
  [CookingTimeFilter.To60]: { max: 60 },
  [CookingTimeFilter.From60]: { min: 60 },
};

const convertFilter = (
  filter: KilocaloriesFilter | CookingTimeFilter | undefined,
  type: 'calories' | 'cookingTime'
) => {
  if (filter === undefined) return undefined;

  switch (type) {
    case 'calories':
      return kilocaloriesFilterConvertors[filter as KilocaloriesFilter];
    case 'cookingTime':
      return cookingTimeFilterConvertors[filter as CookingTimeFilter];
    default:
      return undefined;
  }
};
