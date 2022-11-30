import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useAppContext, useForceUpdate } from 'con-con/hooks';
import { RecipeData } from 'con-con/types/recipes';
import { FlatList } from 'native-base';
import { useEffect } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDiaryContext } from '../../context';
import { AddMealTabParamList } from '../types';
import FavoriteEmpty from './FavoriteEmpty';
import RecipeCard from './RecipeCard';

const FavoriteRecipesScreen = ({
  navigation,
  route,
}: MaterialTopTabScreenProps<AddMealTabParamList, 'FavoriteRecipes'>) => {
  const forceUpdate = useForceUpdate();
  const {
    favoriteRecipes,
    mealsData,
    subscriptions: appSubscriptions,
  } = useAppContext();
  const { subscriptions } = useDiaryContext();
  const mealType = route.params.mealType;

  useEffect(() => {
    const unsubscribe = appSubscriptions.subscribe(
      'favorite-recipes',
      forceUpdate
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = (recipe: RecipeData) => () => {
    const newRecipes = [...mealsData.get.meals[mealType], recipe];
    const newMealsData = {
      ...mealsData.get,
      meals: { ...mealsData.get.meals, [mealType]: newRecipes },
    };
    mealsData.set(newMealsData);
    subscriptions.ping(`meal-card-${mealType}`);
    navigation.navigate('Meals');
  };

  const renderItem = ({ item }: ListRenderItemInfo<RecipeData>) => (
    <RecipeCard
      mb={4}
      flex={0.48}
      recipe={item}
      onAdd={handleAdd(item)}
      goToRecipe={console.log}
    />
  );

  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={{ padding: 16 }}
      columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
      ListEmptyComponent={FavoriteEmpty}
      data={favoriteRecipes.get}
      renderItem={renderItem}
      keyExtractor={(r) => r.id.toString()}
    />
  );
};

FavoriteRecipesScreen.screenName = 'FavoriteRecipes' as const;
FavoriteRecipesScreen.title = 'Избранное';

export default FavoriteRecipesScreen;
