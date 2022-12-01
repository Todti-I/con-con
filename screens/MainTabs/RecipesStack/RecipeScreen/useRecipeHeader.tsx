import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import FavoriteRecipesButton from 'con-con/components/FavoriteRecipesButton';
import { RecipeData } from 'con-con/types/recipes';
import { HStack } from 'native-base';
import { useLayoutEffect } from 'react';
import { RecipesStackParamList } from '../types';

const useRecipeHeader = (
  navigation: NativeStackNavigationProp<RecipesStackParamList, 'Recipe'>,
  recipe: RecipeData | undefined
) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Рецепты',
      headerRight: () => (
        <HStack>
          {recipe && <FavoriteRecipesButton recipe={recipe} />}
          <BasketButton navigateToBasket={navigation.navigate} />
        </HStack>
      ),
    });
  }, [navigation, Boolean(recipe)]);

  return {};
};

export default useRecipeHeader;
