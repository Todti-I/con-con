import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useAppContext } from 'con-con/hooks';
import { RecipeData } from 'con-con/types/recipes';
import { FlatList } from 'native-base';
import { ListRenderItemInfo } from 'react-native';
import { useDiaryContext } from '../../context';
import { recipes } from '../../mock-data';
import { AddMealTabParamList } from '../types';
import RecipeCard from './RecipeCard';

const AllRecipesScreen = ({
  navigation,
  route,
}: MaterialTopTabScreenProps<AddMealTabParamList, 'AllRecipes'>) => {
  const { mealsData } = useAppContext();
  const { subscriptions } = useDiaryContext();
  const mealType = route.params.mealType;

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
