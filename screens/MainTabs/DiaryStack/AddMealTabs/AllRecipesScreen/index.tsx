import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from 'con-con/api';
import {
  useAppContext,
  useForceUpdate,
  useMethodAfterMount,
  useValue,
} from 'con-con/hooks';
import {
  AddMealTabParamList,
  RootStackParamList,
} from 'con-con/types/navigation';
import { RecipeData } from 'con-con/types/recipes';
import { Box, FlatList } from 'native-base';
import { useEffect, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDiaryContext } from '../../context';
import NotFoundRecipes from './NotFoundRecipes';
import RecipeCard from './RecipeCard';
import SearchButton from './SearchButton';
import SkeletonCard from './SkeletonCard';

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<AddMealTabParamList, 'AllRecipes'>,
  NativeStackScreenProps<RootStackParamList>
>;

const pageSize = 50;
const skeletonData = [...Array(10)].map(
  (_, i) => ({ id: i.toString() } as RecipeData)
);

const AllRecipesScreen = ({ navigation, route }: Props) => {
  const {
    mealsData,
    wizardData,
    subscriptions: globalSubscriptions,
  } = useAppContext();
  const forceUpdate = useForceUpdate();
  const { subscriptions } = useDiaryContext();
  const recipes = useValue<RecipeData[]>([]);
  const isLoading = useValue(true, { onUpdate: forceUpdate });
  const offset = useValue(0);
  const hasNext = useValue(true);

  const { mealType, ...searchData } = route.params;

  const [isVegetarian, setIsVegetarian] = useState(() =>
    wizardData.get?.preferences.includes('vegetarian')
  );

  useEffect(() => {
    const unsubscribe = globalSubscriptions.subscribe('wizard-data', () => {
      setIsVegetarian(wizardData.get?.preferences.includes('vegetarian'));
    });

    return () => unsubscribe();
  }, []);

  useMethodAfterMount(
    () =>
      api.cookBook.getRecipesWithSearch(
        offset.get,
        pageSize,
        searchData,
        isVegetarian
      ),
    {
      onStartLoading: () => isLoading.set(true),
      onEndLoading: () => isLoading.set(false),
      next: (result) => {
        offset.set(0);
        hasNext.set(result.length === pageSize);
        recipes.set(result);
      },
      deps: [JSON.stringify(route.params), isVegetarian],
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
    navigation.navigate('MainTabs', {
      screen: 'Diary',
      params: { screen: 'Meals' },
    });
  };

  const handleLoadNext = async () => {
    if (isLoading.get) return;
    isLoading.set(true, true);
    offset.set(offset.get + pageSize);
    const newRecipes = await api.cookBook.getRecipesWithSearch(
      offset.get,
      pageSize,
      searchData,
      isVegetarian
    );
    hasNext.set(newRecipes.length === pageSize);
    recipes.set([...recipes.get, ...newRecipes]);
    isLoading.set(false);
  };

  const goToSearch = () =>
    navigation.navigate('SearchRecipes', {
      screen: 'Filters',
      params: { forScreen: 'AllRecipes', ...searchData },
    });

  const goToRecipe = (recipeId: string) => () =>
    navigation.navigate('MainTabs', {
      screen: 'Recipes',
      params: {
        screen: 'Recipe',
        params: { recipeId },
        initial: false,
      },
    });

  const renderSkeletonItem = () => <SkeletonCard mb={4} />;

  const renderItem = ({ item }: ListRenderItemInfo<RecipeData>) => (
    <RecipeCard
      mb={4}
      recipe={item}
      mealType={mealType}
      onAdd={handleAdd(item)}
      goToRecipe={goToRecipe(item.id)}
    />
  );

  return (
    <Box flex={1} position="relative">
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={isLoading.get ? skeletonData : recipes.get}
        renderItem={isLoading.get ? renderSkeletonItem : renderItem}
        ListFooterComponent={
          hasNext.get && recipes.get.length > 0 ? SkeletonCard : undefined
        }
        ListEmptyComponent={NotFoundRecipes}
        onEndReached={handleLoadNext}
        keyExtractor={(r) => r.id}
      />
      <SearchButton onPress={goToSearch} />
    </Box>
  );
};

AllRecipesScreen.screenName = 'AllRecipes' as const;
AllRecipesScreen.title = 'Рецепты';

export default AllRecipesScreen;
