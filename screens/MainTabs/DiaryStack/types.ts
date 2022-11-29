export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'supper';

export type DiaryStackParamList = {
  Meals: undefined;
  Meal: {
    mealType: MealType;
  };
  AddMeal: {
    mealType: MealType;
  };
};
