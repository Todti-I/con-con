import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  RootStackParamList,
  SearchRecipesStackParamList,
} from 'con-con/types/navigation';
import FiltersScreen from './FiltersScreen';
import IngredientsScreen from './IngredientsScreen';

const Stack = createNativeStackNavigator<SearchRecipesStackParamList>();

const SearchRecipesStack = (
  _: NativeStackScreenProps<RootStackParamList, 'SearchRecipes'>
) => (
  <Stack.Navigator>
    <Stack.Screen name={FiltersScreen.screenName} component={FiltersScreen} />
    <Stack.Screen
      name={IngredientsScreen.screenName}
      component={IngredientsScreen}
    />
  </Stack.Navigator>
);

SearchRecipesStack.screenName = 'SearchRecipes' as const;
SearchRecipesStack.screenOptions = {
  animation: 'slide_from_bottom',
} as NativeStackNavigationOptions;

export default SearchRecipesStack;
