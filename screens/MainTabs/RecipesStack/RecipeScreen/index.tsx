import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from 'con-con/api';
import ImageFallback from 'con-con/api/ImageFallback';
import { useLoadingState, useMethodAfterMount, useValue } from 'con-con/hooks';
import ClockIcon from 'con-con/icons/ClockIcon';
import { RecipesStackParamList } from 'con-con/types/navigation';
import { RecipeData } from 'con-con/types/recipes';
import {
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import BJUBlock from './BJUBlock';
import CookingStepsBlock from './CookingStepsBlock';
import IngredientBlock from './IngredientBlock';
import SkeletonScreen from './SkeletonScreen';
import useRecipeHeader from './useRecipeHeader';

const RecipeScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RecipesStackParamList, 'Recipe'>) => {
  const { isLoading, setIsLoading } = useLoadingState(true);
  const recipe = useValue<RecipeData | undefined>(undefined);
  useRecipeHeader(navigation, recipe.get);

  const recipeId = route.params.recipeId;
  const mass = route.params.mass || 100;

  useMethodAfterMount(() => api.cookBook.getRecipe(recipeId), {
    onStartLoading: () => setIsLoading(true),
    onEndLoading: () => setIsLoading(false),
    next: recipe.set,
    deps: [recipeId],
  });

  if (isLoading || !recipe.get) return <SkeletonScreen />;

  const normalizedTitle =
    recipe.get.title[0].toUpperCase() + recipe.get.title.slice(1).toLowerCase();

  const calcOnMass = (value: number) => Math.round((value * mass) / 100);

  return (
    <ScrollView>
      <Image
        resizeMode="cover"
        w="full"
        h="280px"
        source={{ uri: recipe.get.cover }}
        fallbackElement={<ImageFallback />}
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
            children={`${calcOnMass(recipe.get.kilocalories)} ккал`}
          />
        </HStack>
        <Heading fontSize="lg" children="Данные о питательных веществах" />
        <HStack space={2} justifyContent="space-between">
          <BJUBlock
            name="Углеводы"
            value={calcOnMass(recipe.get.carbohydrate)}
          />
          <BJUBlock name="Белки" value={calcOnMass(recipe.get.protein)} />
          <BJUBlock name="Жиры" value={calcOnMass(recipe.get.fat)} />
        </HStack>
        <Text children={`Пищевая ценность на ${mass}г`} />
        <IngredientBlock
          ingredients={recipe.get.ingredients.map((i) => ({
            ...i,
            mass: calcOnMass(i.mass),
          }))}
        />
        <CookingStepsBlock steps={recipe.get.process} />
      </VStack>
    </ScrollView>
  );
};

RecipeScreen.screenName = 'Recipe' as const;

export default RecipeScreen;
