import { CompositeScreenProps } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import api from 'con-con/api';
import BasketButton from 'con-con/components/BasketButton';
import { useForceUpdate, useMethodAfterMount, useValue } from 'con-con/hooks';
import MultiHeartsIcon from 'con-con/icons/MultiHeartsIcon';
import {
  RecipesStackParamList,
  RootStackParamList,
} from 'con-con/types/navigation';
import { RecipeData, SearchRecipesData } from 'con-con/types/recipes';
import { Box, FlatList, HStack, IconButton, SearchIcon } from 'native-base';
import { useMemo } from 'react';
import { ListRenderItemInfo } from 'react-native';
import NotFoundRecipes from './NotFoundRecipes';
import RecipeCard from './RecipeCard';
import SkeletonCard from './SkeletonCard';

type Props = CompositeScreenProps<
  NativeStackScreenProps<RecipesStackParamList, 'CookBook'>,
  NativeStackScreenProps<RootStackParamList>
>;

const pageSize = 50;
const skeletonData = [...Array(10)].map(
  (_, i) => ({ id: i.toString() } as RecipeData)
);

const CookBookScreen = ({ navigation, route }: Props) => {
  const searchData = { ...route.params } as SearchRecipesData;

  const forceUpdate = useForceUpdate();
  const recipes = useValue<RecipeData[]>([]);
  const isLoading = useValue(true, { onUpdate: forceUpdate });
  const offset = useValue(0);
  const hasNext = useValue(true);

  useMethodAfterMount(
    () => api.cookBook.getRecipesWithSearch(offset.get, pageSize, searchData),
    {
      onStartLoading: () => isLoading.set(true),
      onEndLoading: () => isLoading.set(false),
      next: (result) => {
        offset.set(0);
        hasNext.set(result.length === pageSize);
        recipes.set(result);
      },
      deps: [JSON.stringify(route.params || {})],
    }
  );

  const handleLoadNext = async () => {
    if (isLoading.get || !hasNext.get) return;
    isLoading.set(true, true);
    offset.set(offset.get + pageSize);
    const newRecipes = await api.cookBook.getRecipesWithSearch(
      offset.get,
      pageSize,
      searchData
    );
    hasNext.set(newRecipes.length === pageSize);
    recipes.set([...recipes.get, ...newRecipes]);
    isLoading.set(false);
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
    <FlatList
      numColumns={2}
      contentContainerStyle={{ padding: 16 }}
      columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
      keyExtractor={(r) => r.id}
      data={isLoading.get ? skeletonData : recipes.get}
      renderItem={isLoading.get ? renderSkeletonItem : renderItem}
      onEndReached={handleLoadNext}
      ListEmptyComponent={NotFoundRecipes}
      ListFooterComponent={
        hasNext.get && recipes.get.length > 0 ? Footer : undefined
      }
    />
  );
};

CookBookScreen.screenName = 'CookBook' as const;
CookBookScreen.screenOptions = ({
  navigation,
  route,
}: CompositeScreenProps<
  NativeStackScreenProps<RecipesStackParamList, 'CookBook'>,
  NativeStackScreenProps<RootStackParamList>
>): NativeStackNavigationOptions => ({
  headerTitle: 'Рецепты',
  headerLeft: () => <Box ml={4} />,
  headerRight: () => (
    <HStack space={2}>
      <IconButton
        borderRadius="full"
        icon={<SearchIcon />}
        colorScheme="light"
        onPress={() =>
          navigation.navigate('SearchRecipes', {
            screen: 'Filters',
            params: { ...route.params, forScreen: 'CookBook' },
          })
        }
      />
      <IconButton
        borderRadius="full"
        icon={<MultiHeartsIcon />}
        colorScheme="light"
        onPress={() => navigation.navigate('FavoriteRecipes')}
      />
      <BasketButton navigateToBasket={navigation.navigate} />
    </HStack>
  ),
});

export default CookBookScreen;
