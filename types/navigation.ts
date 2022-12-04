import { NavigatorScreenParams } from '@react-navigation/native';
import { MealType } from './recipes';

export type RootStackParamList = {
  Wizard?: NavigatorScreenParams<WizardStackParamList>;
  MainTabs?: NavigatorScreenParams<MainTabParamList>;
  Basket: undefined;
};

export type WizardStackParamList = {
  Welcome: undefined;
  Gender: undefined;
  Birthday: undefined;
  Growth: undefined;
  Weight: undefined;
  DesiredWeight: undefined;
  ActivityType: undefined;
  Preferences: undefined;
  Email: undefined;
};

export type MainTabParamList = {
  Diary?: NavigatorScreenParams<DiaryStackParamList>;
  Recipes?: NavigatorScreenParams<RecipesStackParamList>;
  Articles: undefined;
  Profile: undefined;
};

export type DiaryStackParamList = {
  Meals: undefined;
  Meal: {
    mealType: MealType;
  };
  AddMeal: {
    mealType: MealType;
  };
};

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
};

export type RecipesStackParamList = {
  CookBook: undefined;
  FavoriteRecipes: undefined;
  Recipe: {
    recipeId: string;
  };
};
