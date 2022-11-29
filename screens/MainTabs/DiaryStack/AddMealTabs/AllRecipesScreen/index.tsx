import { Box, FlatList } from 'native-base';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { AddMealTabParamList } from '../types';
import RecipeCard from './RecipeCard';
import { recipes } from '../../mock-data';
import { RecipeData } from '../../types';
import { ListRenderItemInfo } from 'react-native';
import { useDiaryContext } from '../../context';

const AllRecipesScreen = ({
  navigation,
  route,
}: MaterialTopTabScreenProps<AddMealTabParamList, 'AllRecipes'>) => {
  const { meals, subscriptions } = useDiaryContext();
  const mealType = route.params.mealType;

  const handleAdd = (recipe: RecipeData) => () => {
    const newRecipes = [...(meals.get.get(mealType) || []), recipe];
    meals.get.set(mealType, newRecipes);
    subscriptions.ping('diary-widget');
    subscriptions.ping(`meal-card-${mealType}`);
    navigation.navigate('Meals');
  };

  const renderItem = ({ item }: ListRenderItemInfo<RecipeData>) => (
    <RecipeCard
      recipe={item}
      onAdd={handleAdd(item)}
      goToRecipe={console.log}
    />
  );

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={recipes}
      renderItem={renderItem}
      // onEndReached={console.log}
      keyExtractor={(r) => r.id.toString()}
    />
  );
};

AllRecipesScreen.screenName = 'AllRecipes' as const;
AllRecipesScreen.title = 'Рецепты';

export default AllRecipesScreen;
