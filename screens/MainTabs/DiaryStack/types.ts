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

export type Recipe = {
  id: string;
  title: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  kilocalories: number;
  cookingTime: number;
  mealType: MealType;
};
