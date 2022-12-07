import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipesIcon from 'con-con/icons/RecipesIcon';
import {
  MainTabParamList,
  RecipesStackParamList,
} from 'con-con/types/navigation';
import CookBookScreen from './CookBookScreen';
import FavoriteRecipesScreen from './FavoriteRecipesScreen';
import RecipeScreen from './RecipeScreen';

const Stack = createNativeStackNavigator<RecipesStackParamList>();

const RecipesStack = (_: BottomTabScreenProps<MainTabParamList, 'Recipes'>) => (
  <Stack.Navigator
    initialRouteName="CookBook"
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
    <Stack.Screen
      name={FavoriteRecipesScreen.screenName}
      component={FavoriteRecipesScreen}
      options={FavoriteRecipesScreen.screenOptions}
    />
    <Stack.Screen name={RecipeScreen.screenName} component={RecipeScreen} />
  </Stack.Navigator>
);

RecipesStack.screenName = 'Recipes' as const;
RecipesStack.title = 'Рецепты';
RecipesStack.Icon = RecipesIcon;

export default RecipesStack;
