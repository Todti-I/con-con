import { Box } from 'native-base';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { AddMealTabParamList } from './types';

const FavoriteRecipesScreen = (
  _: MaterialTopTabScreenProps<AddMealTabParamList, 'FavoriteRecipes'>
) => {
  return <Box flex={1}>FavoriteRecipesScreen</Box>;
};

FavoriteRecipesScreen.screenName = 'FavoriteRecipes' as const;
FavoriteRecipesScreen.title = 'Избранное';

export default FavoriteRecipesScreen;
