import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import api from 'con-con/api';
import {
  useAppContext,
  useLoadingState,
  useMethodAfterMount,
  useValue,
} from 'con-con/hooks';
import { RecipeData } from 'con-con/types/recipes';
import { Box, Skeleton } from 'native-base';
import { useState } from 'react';
import { Animated } from 'react-native';
import { useDiaryContext } from '../../context';

import { AddMealTabParamList } from '../types';
import ControlButtons from './ControlButtons';
import RecipeCard from './RecipeCard';
import useCardsAnimation from './useCardsAnimation';

const RecipesForYouScreen = ({
  navigation,
  route,
}: MaterialTopTabScreenProps<AddMealTabParamList, 'RecipesForYou'>) => {
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

  useMethodAfterMount(() => api.recipes.getRecipes(), {
    onStartLoading: () => setIsLoading(true),
    onEndLoading: () => setIsLoading(false),
    next: recipes.set,
  });

  const getNextPos = (pos: number): number => {
    return pos + 1 > recipes.get.length - 1 ? 0 : pos + 1;
  };

  const mealType = route.params.mealType;
  const currentRecipe = recipes.get[pos];
  const nextRecipe = recipes.get[getNextPos(pos)];

  const handleAdd = () => {
    if (lockControl.get) return;
    const newRecipes = [...mealsData.get.meals[mealType], currentRecipe];
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
          children={<RecipeCard recipe={currentRecipe} />}
        />
      </Skeleton>

      <ControlButtons
        isDisabled={isLoading}
        recipe={currentRecipe}
        onAdd={handleAdd}
        onNext={handleNext}
      />
    </Box>
  );
};

RecipesForYouScreen.screenName = 'RecipesForYou' as const;
RecipesForYouScreen.title = 'Для вас';

export default RecipesForYouScreen;
