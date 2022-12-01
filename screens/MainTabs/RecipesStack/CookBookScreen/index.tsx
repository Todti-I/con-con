import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import api from 'con-con/api';
import { useForceUpdate, useMethodAfterMount, useValue } from 'con-con/hooks';
import { RecipeData } from 'con-con/types/recipes';
import { Box, FlatList } from 'native-base';
import { useMemo } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { SearchBar } from 'react-native-screens';
import { RecipesStackParamList } from '../types';
import NotFoundRecipes from './NotFoundRecipes';
import RecipeCard from './RecipeCard';
import SkeletonCard from './SkeletonCard';
import useCookBookHeader from './useCookBookHeader';

const pageSize = 50;
const skeletonData = [...Array(10)].map(
  (_, i) => ({ id: i.toString() } as RecipeData)
);

const CookBookScreen = ({
  navigation,
}: NativeStackScreenProps<RecipesStackParamList, 'CookBook'>) => {
  const {} = useCookBookHeader(navigation);
  const forceUpdate = useForceUpdate();
  const recipes = useValue<RecipeData[]>([]);
  const isLoading = useValue(true);
  const offset = useValue(0);
  const hasNext = useValue(true);

  useMethodAfterMount(
    () =>
      api.cookBook.getRecipesWithSearch({
        offset: offset.get,
        limit: pageSize,
        title: '',
      }),
    {
      onStartLoading: () => isLoading.set(true),
      onEndLoading: () => {
        isLoading.set(false);
        forceUpdate();
      },
      next: recipes.set,
      deps: [],
    }
  );

  const handleLoadNext = async () => {
    if (isLoading.get) return;
    isLoading.set(true);
    offset.set(offset.get + pageSize);
    const newRecipes = await api.cookBook.getRecipesWithSearch({
      offset: offset.get,
      limit: pageSize,
      title: '',
    });
    hasNext.set(newRecipes.length === pageSize);
    recipes.set([...recipes.get, ...newRecipes]);
    isLoading.set(false);
    forceUpdate();
  };

  const renderSkeletonItem = () => <SkeletonCard mb={4} />;

  const renderItem = ({ item }: ListRenderItemInfo<RecipeData>) => (
    <RecipeCard
      mb={4}
      flex={0.48}
      recipe={item}
      goToRecipe={() => navigation.navigate('Recipe', { recipeId: item.id })}
    />
  );

  const Footer = useMemo(() => {
    return (
      <Box flex={1} justifyContent="space-between" flexDir="row">
        <SkeletonCard />
        <SkeletonCard />
      </Box>
    );
  }, []);

  return (
    <>
      <SearchBar />
      <FlatList
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
        keyExtractor={(r) => r.id}
        data={isLoading.get ? skeletonData : recipes.get}
        renderItem={isLoading.get ? renderSkeletonItem : renderItem}
        ListEmptyComponent={NotFoundRecipes}
        ListFooterComponent={
          hasNext.get && recipes.get.length > 0 ? Footer : undefined
        }
        onEndReached={handleLoadNext}
      />
    </>
  );
};

CookBookScreen.screenName = 'CookBook' as const;
CookBookScreen.screenOptions = {} as NativeStackNavigationOptions;

export default CookBookScreen;
