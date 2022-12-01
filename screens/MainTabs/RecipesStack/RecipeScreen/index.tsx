import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from 'con-con/api';
import { useLoadingState, useMethodAfterMount, useValue } from 'con-con/hooks';
import ClockIcon from 'con-con/icons/ClockIcon';
import { RecipeData } from 'con-con/types/recipes';
import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import { RecipesStackParamList } from '../types';
import BJUBlock from './BJUBlock';
import CookingStepsBlock from './CookingStepsBlock';
import IngredientBlock from './IngredientBlock';
import useRecipeHeader from './useRecipeHeader';

const RecipeScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RecipesStackParamList, 'Recipe'>) => {
  const { isLoading, setIsLoading } = useLoadingState(true);
  const recipe = useValue<RecipeData | undefined>(undefined);
  useRecipeHeader(navigation, recipe.get);

  const recipeId = route.params.recipeId;

  useMethodAfterMount(() => api.cookBook.getRecipe(recipeId), {
    onStartLoading: () => setIsLoading(true),
    onEndLoading: () => setIsLoading(false),
    next: recipe.set,
  });

  if (isLoading || !recipe.get)
    return (
      <Center>
        <Text children="Загрузка..." />
      </Center>
    );

  const normalizedTitle =
    recipe.get.title[0].toUpperCase() + recipe.get.title.slice(1).toLowerCase();

  return (
    <ScrollView>
      <Image
        resizeMode="cover"
        w="full"
        h="280px"
        source={{ uri: recipe.get.cover }}
        alt={recipe.get.title || 'рецепт'}
      />
      <VStack p={4} space={4}>
        <Heading children={normalizedTitle} />
        <HStack space={2} alignItems="center">
          <ClockIcon size={5} color="violet.600" />
          <Text fontSize="md" children={`${recipe.get.cookingTime} минут`} />
          <Spacer />
          <Text
            fontSize="md"
            fontWeight="500"
            children={`${recipe.get.kilocalories} ккал`}
          />
        </HStack>
        <Heading fontSize="lg" children="Данные о питательных веществах" />
        <HStack space={2} justifyContent="space-between">
          <BJUBlock name="Углеводы" value={recipe.get.carbohydrate} />
          <BJUBlock name="Белки" value={recipe.get.protein} />
          <BJUBlock name="Жиры" value={recipe.get.fat} />
        </HStack>
        <Text children="Пищевая ценность на 100г" />
        <IngredientBlock ingredients={recipe.get.ingredients} />
        <CookingStepsBlock steps={recipe.get.process} />
      </VStack>
    </ScrollView>
  );
};

RecipeScreen.screenName = 'Recipe' as const;

export default RecipeScreen;
