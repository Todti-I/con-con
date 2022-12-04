import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchRecipesStackParamList } from 'con-con/types/navigation';
import { Box, Text } from 'native-base';

const IngredientsScreen = (
  props: NativeStackScreenProps<SearchRecipesStackParamList, 'Ingredients'>
) => (
  <Box flex={1} bg="#F7F7F7" alignItems="center" justifyContent="center">
    <Text>IngredientsScreen</Text>
  </Box>
);

IngredientsScreen.screenName = 'Ingredients' as const;

export default IngredientsScreen;
