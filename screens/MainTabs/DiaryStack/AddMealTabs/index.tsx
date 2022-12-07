import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  AddMealTabParamList,
  DiaryStackParamList,
} from 'con-con/types/navigation';
import { useLayoutEffect } from 'react';
import mealTypeData from '../meal-type-data';
import AllRecipesScreen from './AllRecipesScreen';
import FavoriteRecipesScreen from './FavoriteRecipesScreen';
import { tabBarOptions } from './options';
import RecipesForYouScreen from './RecipesForYouScreen';

const Tab = createMaterialTopTabNavigator<AddMealTabParamList>();

const AddMealTabs = ({
  navigation,
  route,
}: NativeStackScreenProps<DiaryStackParamList, 'AddMeal'>) => {
  const mealType = route.params.mealType;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Добавить ${mealTypeData[mealType].name.toLowerCase()}`,
    });
  }, [mealType]);

  return (
    <Tab.Navigator screenOptions={{ ...tabBarOptions }}>
      <Tab.Screen
        name={RecipesForYouScreen.screenName}
        component={RecipesForYouScreen}
        options={{ title: RecipesForYouScreen.title }}
        initialParams={{ mealType }}
      />
      <Tab.Screen
        name={AllRecipesScreen.screenName}
        component={AllRecipesScreen}
        options={{ title: AllRecipesScreen.title }}
        initialParams={{ mealType }}
      />
      <Tab.Screen
        name={FavoriteRecipesScreen.screenName}
        component={FavoriteRecipesScreen}
        options={{ title: FavoriteRecipesScreen.title }}
        initialParams={{ mealType }}
      />
    </Tab.Navigator>
  );
};

AddMealTabs.screenName = 'AddMeal' as const;
AddMealTabs.screenOptions = {
  animation: 'default',
  headerShadowVisible: false,
} as NativeStackNavigationOptions;

export default AddMealTabs;
