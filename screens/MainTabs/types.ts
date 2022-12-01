import { RootStackParamList } from '../types';

export type MainTabParamList = {
  Diary: undefined;
  Recipes: {
    recipeId?: string;
  };
  Articles: undefined;
  Profile: undefined;
} & RootStackParamList;
