import { NavigatorScreenParams } from '@react-navigation/native';
import { MealType, SearchRecipesData } from './recipes';

export type RootStackParamList = {
  Wizard?: NavigatorScreenParams<WizardStackParamList>;
  MainTabs?: NavigatorScreenParams<MainTabParamList>;
  SearchRecipes: NavigatorScreenParams<SearchRecipesStackParamList>;
  Basket: undefined;
};

export type WizardStackParamList = {
  Welcome: undefined;
  Gender: undefined;
  Birthday: undefined;
  Growth: undefined;
  Weight: undefined;
  ActivityType: undefined;
  Preferences: undefined;
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
  } & SearchRecipesData;
  FavoriteRecipes: {
    mealType: MealType;
  };
};

export type RecipesStackParamList = {
  CookBook?: SearchRecipesData;
  FavoriteRecipes: undefined;
  Recipe: {
    recipeId: string;
    mass?: number;
  };
};

export type SearchRecipesStackParamList = {
  Filters: { forScreen: 'CookBook' | 'AllRecipes' } & SearchRecipesData;
  Ingredients: {
    forScreen: 'CookBook' | 'AllRecipes';
    type: 'include' | 'exclude';
  } & SearchRecipesData;
};
