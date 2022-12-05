import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from 'con-con/api';
import {
  useAppContext,
  useLoadingState,
  useMethodAfterMount,
  useValue,
} from 'con-con/hooks';
import {
  AddMealTabParamList,
  DiaryStackParamList,
  MainTabParamList,
} from 'con-con/types/navigation';
import { RecipeData } from 'con-con/types/recipes';
import { Box, Skeleton } from 'native-base';
import { useState } from 'react';
import { Animated } from 'react-native';
import { useDiaryContext } from '../../context';
import mealTypeData from '../../meal-type-data';
import ControlButtons from './ControlButtons';
import RecipeCard from './RecipeCard';
import useCardsAnimation from './useCardsAnimation';

type Props = CompositeScreenProps<
  CompositeScreenProps<
    MaterialTopTabScreenProps<AddMealTabParamList, 'RecipesForYou'>,
    NativeStackScreenProps<DiaryStackParamList>
  >,
  BottomTabScreenProps<MainTabParamList>
>;

const RecipesForYouScreen = ({ navigation, route }: Props) => {
  const mealType = route.params.mealType;

  const { mealsData } = useAppContext();
  const { subscriptions } = useDiaryContext();
  const [pos, setPos] = useState(0);
  const recipes = useValue<RecipeData[]>([]);
  const { isLoading, setIsLoading } = useLoadingState(true);

  const {
    lockControl,
    startAnimation,
    backCardAnimationStyles,
    topCardAnimationStyles,
  } = useCardsAnimation();

  useMethodAfterMount(
    () => api.recipes.getRecipes(mealTypeData[mealType].typeId),
    {
      onStartLoading: () => setIsLoading(true),
      onEndLoading: () => setIsLoading(false),
      next: recipes.set,
      deps: [mealType],
    }
  );

  const getNextPos = (pos: number): number => {
    return pos + 1 > recipes.get.length - 1 ? 0 : pos + 1;
  };

  const currentRecipe = recipes.get[pos];
  const nextRecipe = recipes.get[getNextPos(pos)];

  const handleAdd = (mass: number) => {
    if (lockControl.get) return;
    const newRecipes = [
      ...mealsData.get.meals[mealType],
      { ...currentRecipe, mass },
    ];
    const newMealsData = {
      ...mealsData.get,
      meals: { ...mealsData.get.meals, [mealType]: newRecipes },
    };
    mealsData.set(newMealsData);
    subscriptions.ping(`meal-card-${mealType}`);
    navigation.navigate('Meals');
  };

  const handleNext = () => {
    if (lockControl.get) return;
    startAnimation(() => setPos(getNextPos));
  };

  return (
    <Box flex={1} p={8} position="relative">
      {!isLoading && (
        <Animated.View
          style={{
            width: '100%',
            height: '80%',
            left: 32,
            top: 32,
            position: 'absolute',
            ...backCardAnimationStyles,
          }}
          children={nextRecipe ? <RecipeCard recipe={nextRecipe} /> : null}
        />
      )}

      <Skeleton
        isLoaded={!isLoading}
        borderRadius={15}
        h="80%"
        startColor="text.200"
        endColor="text.300"
      >
        <Animated.View
          style={{
            width: '100%',
            height: '80%',
            ...topCardAnimationStyles,
          }}
          children={
            <RecipeCard
              recipe={currentRecipe}
              goToRecipe={() =>
                navigation.navigate('Recipes', {
                  screen: 'Recipe',
                  params: { recipeId: currentRecipe.id },
                  initial: false,
                })
              }
            />
          }
        />
      </Skeleton>
      <ControlButtons
        isDisabled={isLoading}
        recipe={currentRecipe}
        mealType={mealType}
        onAdd={handleAdd}
        onNext={handleNext}
      />
    </Box>
  );
};

RecipesForYouScreen.screenName = 'RecipesForYou' as const;
RecipesForYouScreen.title = 'Для вас';

export default RecipesForYouScreen;
