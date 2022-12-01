import { MealType } from 'con-con/types/recipes';

export type DiaryStackParamList = {
  Meals: undefined;
  Meal: {
    mealType: MealType;
  };
  AddMeal: {
    mealType: MealType;
  };
};
