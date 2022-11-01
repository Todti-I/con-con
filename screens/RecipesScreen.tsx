import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Box, Text } from 'native-base';
import { TabParamList } from './types';

const RecipesScreen = (
  props: BottomTabScreenProps<TabParamList, 'Recipes'>
) => (
  <Box
    flex={1}
    backgroundColor="#fff"
    alignItems="center"
    justifyContent="center"
  >
    <Text>RecipesScreen</Text>
  </Box>
);

RecipesScreen.screenName = 'Recipes' as const;
RecipesScreen.title = 'Рецепты';

export default RecipesScreen;
