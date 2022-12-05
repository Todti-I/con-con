export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'supper';

export type RecipeData = {
  id: string;
  title: string;
  cover: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  kilocalories: number;
  process: {
    step: number;
    description: string;
  }[];
  ingredients: IngredientData[];
  cookingTime: number;
  mealType: number;
  vegeterian: number;
  mass: number;
};

export type IngredientData = {
  id: string;
  name: string;
  mass: number;
};

export type MealsData = {
  date: string;
  meals: Record<MealType, RecipeData[]>;
};

export const defaultMealsData = (): MealsData => ({
  date: '',
  meals: {
    breakfast: [],
    dinner: [],
    lunch: [],
    supper: [],
  },
});

export type SearchRecipesData = {
  title?: string;
  mealTypeId?: number;
  kilocaloriesId?: number;
  cookingTimeId?: number;
  includeIngredientIds?: string[];
  excludeIngredientIds?: string[];
};
