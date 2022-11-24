import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import RecipesIcon from 'con-con/icons/RecipesIcon';
import { Box, Text } from 'native-base';
import { MainTabParamList } from './types';

const RecipesScreen = (
  props: BottomTabScreenProps<MainTabParamList, 'Recipes'>
) => (
  <Box flex={1} bg="#F7F7F7" alignItems="center" justifyContent="center">
    <Text>RecipesScreen</Text>
  </Box>
);

RecipesScreen.screenName = 'Recipes' as const;
RecipesScreen.title = 'Рецепты';
RecipesScreen.Icon = RecipesIcon;

export default RecipesScreen;
