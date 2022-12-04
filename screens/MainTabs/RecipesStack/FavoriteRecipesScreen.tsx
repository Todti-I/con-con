import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import { useAppContext } from 'con-con/hooks';
import MultiHeartsIcon from 'con-con/icons/MultiHeartsIcon';
import { RecipesStackParamList } from 'con-con/types/navigation';
import { RecipeData } from 'con-con/types/recipes';
import { Box, FlatList, HStack, IconButton } from 'native-base';
import { ListRenderItemInfo } from 'react-native';
import FavoriteEmpty from '../DiaryStack/AddMealTabs/FavoriteRecipesScreen/FavoriteEmpty';
import RecipeCard from './CookBookScreen/RecipeCard';

const FavoriteRecipesScreen = ({
  navigation,
}: NativeStackScreenProps<RecipesStackParamList, 'FavoriteRecipes'>) => {
  const { favoriteRecipes } = useAppContext();

  const renderItem = ({ item }: ListRenderItemInfo<RecipeData>) => (
    <RecipeCard
      mb={4}
      flex={0.48}
      recipe={item}
      goToRecipe={() => navigation.navigate('Recipe', { recipeId: item.id })}
    />
  );

  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={{ padding: 16 }}
      columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
      keyExtractor={(r) => r.id}
      data={favoriteRecipes.get}
      renderItem={renderItem}
      ListEmptyComponent={FavoriteEmpty}
    />
  );
};

FavoriteRecipesScreen.screenName = 'FavoriteRecipes' as const;
FavoriteRecipesScreen.screenOptions = (props: {
  navigation: NativeStackNavigationProp<
    RecipesStackParamList,
    'FavoriteRecipes',
    undefined
  >;
}): NativeStackNavigationOptions => ({
  animation: 'none',
  headerTitle: 'Любимые рецепты',
  headerLeft: () => <Box ml={4} />,
  headerRight: () => (
    <HStack space={2}>
      <IconButton
        borderRadius="full"
        icon={<MultiHeartsIcon />}
        colorScheme="red"
        onPress={() => props.navigation.navigate('CookBook')}
      />
      <BasketButton navigateToBasket={props.navigation.navigate} />
    </HStack>
  ),
});

export default FavoriteRecipesScreen;
