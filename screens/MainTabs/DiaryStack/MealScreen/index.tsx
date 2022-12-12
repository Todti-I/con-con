import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext, useForceUpdate } from 'con-con/hooks';
import {
  DiaryStackParamList,
  MainTabParamList,
} from 'con-con/types/navigation';
import { RecipeData } from 'con-con/types/recipes';
import { FlatList } from 'native-base';
import { useEffect } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDiaryContext } from '../context';
import DiaryWidget from '../DiaryWidget';
import mealTypeData from '../meal-type-data';
import AddMealButton from './AddMealButton';
import RecipeCard from './RecipeCard';

type Props = CompositeScreenProps<
  NativeStackScreenProps<DiaryStackParamList, 'Meal'>,
  BottomTabScreenProps<MainTabParamList>
>;

const MealScreen = ({ navigation, route }: Props) => {
  const forceUpdate = useForceUpdate();
  const { mealsData, subscriptions: globalSubscriptions } = useAppContext();
  const { subscriptions } = useDiaryContext();
  const mealType = route.params.mealType;

  useEffect(() => {
    navigation.setOptions({ headerTitle: mealTypeData[mealType].name });
    const unsubscribe = globalSubscriptions.subscribe(
      'is-wizard-complete',
      forceUpdate
    );

    return () => {
      unsubscribe();
      subscriptions.ping(`meal-card-${mealType}`);
    };
  }, []);

  const handleRemove = (id: string) => () => {
    const newRecipes = mealsData.get.meals[mealType].filter((r) => r.id !== id);
    const newMealsData = {
      ...mealsData.get,
      meals: { ...mealsData.get.meals, [mealType]: newRecipes },
    };
    mealsData.set(newMealsData);
  };

  const Header = (
    <>
      <DiaryWidget key="widget" />
      <AddMealButton
        mt={6}
        key="add-meal"
        onPress={() => navigation.navigate('AddMeal', { mealType })}
      />
    </>
  );

  const renderItem = ({ item }: ListRenderItemInfo<RecipeData>) => (
    <RecipeCard
      recipe={item}
      onRemove={handleRemove(item.id)}
      goToRecipeScreen={() =>
        navigation.navigate('Recipes', {
          screen: 'Recipe',
          params: { recipeId: item.id },
          initial: false,
        })
      }
    />
  );

  return (
    <FlatList
      flex={1}
      bg="#F7F7F7"
      contentContainerStyle={{ padding: 16 }}
      renderItem={renderItem}
      ListHeaderComponent={Header}
      data={mealsData.get.meals[mealType]}
      keyExtractor={(_, i) => i.toString()}
    />
  );
};

MealScreen.screenName = 'Meal' as const;

export default MealScreen;
