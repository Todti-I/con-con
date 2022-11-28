import { Box } from 'native-base';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { AddMealTabParamList } from './types';

const AllRecipesScreen = (
  _: MaterialTopTabScreenProps<AddMealTabParamList, 'AllRecipes'>
) => {
  return <Box flex={1}>AllRecipesScreen</Box>;
};

AllRecipesScreen.screenName = 'AllRecipes' as const;
AllRecipesScreen.title = 'Рецепты';

export default AllRecipesScreen;
