import { MealType } from 'con-con/types/recipes';
import { DiaryStackParamList } from '../types';

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
