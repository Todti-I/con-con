export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'supper';

export type RecipeData = {
  id: number;
  title: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  kilocalories: number;
  process: {
    step: number;
    description: string;
  }[];
  ingridients: {
    id: string;
    value: string;
  }[];
  cookingTime: number;
  mealType: number;
  vegeterian: number;
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
