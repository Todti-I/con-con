import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import RecipesIcon from 'con-con/icons/RecipesIcon';
import { MainTabParamList } from '../types';
import CookBookScreen from './CookBookScreen';
import RecipeScreen from './RecipeScreen';
import { RecipesStackParamList } from './types';

const Stack = createNativeStackNavigator<RecipesStackParamList>();

const RecipesStack = ({
  navigation,
}: BottomTabScreenProps<MainTabParamList, 'Recipes'>) => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'Рецепты',
      headerTitleStyle: {
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
      },
    }}
  >
    <Stack.Screen
      name={CookBookScreen.screenName}
      component={CookBookScreen}
      options={CookBookScreen.screenOptions}
    />
    <Stack.Screen name={RecipeScreen.screenName} component={RecipeScreen} />
  </Stack.Navigator>
);

RecipesStack.screenName = 'Recipes' as const;
RecipesStack.title = 'Рецепты';
RecipesStack.Icon = RecipesIcon;

export default RecipesStack;
