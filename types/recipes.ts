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

export enum MealTypeFilter {
  Breakfast = 1,
  Dinner = 2,
  Supper = 3,
}

export enum KilocaloriesFilter {
  To200,
  From200To400,
  From400,
}

export enum CookingTimeFilter {
  To15,
  To30,
  To45,
  To60,
  From60,
}

export type SearchRecipesData = {
  title?: string;
  mealTypeFilter?: MealTypeFilter;
  kilocaloriesFilter?: KilocaloriesFilter;
  cookingTimeFilter?: CookingTimeFilter;
  includeIngredientIds?: string[];
  excludeIngredientIds?: string[];
};
