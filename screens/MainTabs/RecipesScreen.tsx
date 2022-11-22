import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
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

export default RecipesScreen;
