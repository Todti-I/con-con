import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import api from 'con-con/api';
import {
  useAppContext,
  useForceUpdate,
  useMethodAfterMount,
  useValue,
} from 'con-con/hooks';
import { RecipeData } from 'con-con/types/recipes';
import { FlatList } from 'native-base';
import { useMemo, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDiaryContext } from '../../context';
import { AddMealTabParamList } from '../types';
import NotFoundRecipes from './NotFoundRecipes';
import RecipeCard from './RecipeCard';
import RecipeSearch from './RecipeSearch';
import SkeletonCard from './SkeletonCard';

const pageSize = 50;
const skeletonData = [...Array(10)].map(
  (_, i) => ({ id: i.toString() } as RecipeData)
);

const AllRecipesScreen = ({
  navigation,
  route,
}: MaterialTopTabScreenProps<AddMealTabParamList, 'AllRecipes'>) => {
  const forceUpdate = useForceUpdate();
  const { mealsData } = useAppContext();
  const { subscriptions } = useDiaryContext();
  const recipes = useValue<RecipeData[]>([]);
  const isLoading = useValue(true);
  const offset = useValue(0);
  const hasNext = useValue(true);
  const [searchValue, setSearchValue] = useState('');

  const mealType = route.params.mealType;

  useMethodAfterMount(
    () =>
      api.cookBook.getRecipesWithSearch({
        offset: offset.get,
        limit: pageSize,
        title: searchValue,
      }),
    {
      onStartLoading: () => isLoading.set(true),
      onEndLoading: () => {
        isLoading.set(false);
        forceUpdate();
      },
      next: recipes.set,
      deps: [searchValue],
    }
  );

  const handleAdd = (recipe: RecipeData) => (mass: number) => {
    const newRecipes = [...mealsData.get.meals[mealType], { ...recipe, mass }];
    const newMealsData = {
      ...mealsData.get,
      meals: { ...mealsData.get.meals, [mealType]: newRecipes },
    };
    mealsData.set(newMealsData);
    subscriptions.ping(`meal-card-${mealType}`);
    navigation.navigate('Meals');
  };

  const handleLoadNext = async () => {
    if (isLoading.get) return;
    isLoading.set(true);
    offset.set(offset.get + pageSize);
    const newRecipes = await api.cookBook.getRecipesWithSearch({
      offset: offset.get,
      limit: pageSize,
      title: searchValue,
    });
    hasNext.set(newRecipes.length === pageSize);
    recipes.set([...recipes.get, ...newRecipes]);
    isLoading.set(false);
    forceUpdate();
  };

  const handleSearch = (value: string) => {
    if (isLoading.get) return;
    setSearchValue((oldValue) => {
      if (oldValue === value) return value;
      isLoading.set(true);
      offset.set(0);
      return value;
    });
  };

  const renderSkeletonItem = () => <SkeletonCard mb={4} />;

  const renderItem = ({ item }: ListRenderItemInfo<RecipeData>) => (
    <RecipeCard
      mb={4}
      recipe={item}
      mealType={mealType}
      onAdd={handleAdd(item)}
      goToRecipe={console.log}
    />
  );

  const Header = useMemo(
    () => <RecipeSearch mb={4} onSearch={handleSearch} />,
    []
  );

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={isLoading.get ? skeletonData : recipes.get}
      renderItem={isLoading.get ? renderSkeletonItem : renderItem}
      ListFooterComponent={
        hasNext.get && recipes.get.length > 0 ? SkeletonCard : undefined
      }
      ListHeaderComponent={Header}
      ListEmptyComponent={NotFoundRecipes}
      onEndReached={handleLoadNext}
      keyExtractor={(r) => r.id}
    />
  );
};

AllRecipesScreen.screenName = 'AllRecipes' as const;
AllRecipesScreen.title = 'Рецепты';

export default AllRecipesScreen;
