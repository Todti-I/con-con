import { Box } from 'native-base';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { AddMealTabParamList } from './types';

const RecipesForYouScreen = (
  _: MaterialTopTabScreenProps<AddMealTabParamList, 'RecipesForYou'>
) => {
  return <Box flex={1}>RecipesForYouScreen</Box>;
};

RecipesForYouScreen.screenName = 'RecipesForYou' as const;
RecipesForYouScreen.title = 'Для вас';

export default RecipesForYouScreen;
