import { DiaryStackParamList, MealType } from '../types';

export type AddMealTabParamList = {
  RecipesForYou: {
    mealType: MealType;
  };
  AllRecipes: {
    mealType: MealType;
  };
  FavoriteRecipes: {
    mealType: MealType;
  };
} & DiaryStackParamList;
