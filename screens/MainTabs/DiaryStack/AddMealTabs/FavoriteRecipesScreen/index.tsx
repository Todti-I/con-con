import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import RecipeData from 'con-con/types/recipe-data';
import { FlatList } from 'native-base';
import { ListRenderItemInfo } from 'react-native';
import { useDiaryContext } from '../../context';
import { recipes } from '../../mock-data';
import { AddMealTabParamList } from '../types';
import RecipeCard from './RecipeCard';

const FavoriteRecipesScreen = ({
  navigation,
  route,
}: MaterialTopTabScreenProps<AddMealTabParamList, 'FavoriteRecipes'>) => {
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
      data={recipes}
      renderItem={renderItem}
      // onEndReached={console.log}
      keyExtractor={(r) => r.id.toString()}
    />
  );
};

FavoriteRecipesScreen.screenName = 'FavoriteRecipes' as const;
FavoriteRecipesScreen.title = 'Избранное';

export default FavoriteRecipesScreen;
