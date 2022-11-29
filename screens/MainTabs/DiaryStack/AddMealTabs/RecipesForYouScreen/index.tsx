import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { Box } from 'native-base';
import { useState } from 'react';
import { Animated } from 'react-native';
import { useDiaryContext } from '../../context';
import { recipes } from '../../mock-data';
import { AddMealTabParamList } from '../types';
import ControlButtons from './ControlButtons';
import RecipeCard from './RecipeCard';
import useCardsAnimation from './useCardsAnimation';

const RecipesForYouScreen = ({
  navigation,
  route,
}: MaterialTopTabScreenProps<AddMealTabParamList, 'RecipesForYou'>) => {
  const { meals, subscriptions } = useDiaryContext();
  const [pos, setPos] = useState(0);

  const {
    lockControl,
    startAnimation,
    backCardAnimationStyles,
    topCardAnimationStyles,
  } = useCardsAnimation();

  const mealType = route.params.mealType;
  const currentRecipe = recipes[pos];
  const nextRecipe = recipes[pos + 1];

  const handleAdd = () => {
    if (lockControl.get) return;
    const newRecipes = [...(meals.get.get(mealType) || []), currentRecipe];
    meals.get.set(mealType, newRecipes);
    subscriptions.ping('diary-widget');
    subscriptions.ping(`meal-card-${mealType}`);
    navigation.navigate('Meals');
  };

  const handleNext = () => {
    if (lockControl.get) return;
    startAnimation(() => setPos(pos + 1 > recipes.length - 1 ? 0 : pos + 1));
  };

  return (
    <Box flex={1} p={8} position="relative">
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
      <Animated.View
        style={{
          width: '100%',
          height: '80%',
          ...topCardAnimationStyles,
        }}
        children={<RecipeCard recipe={currentRecipe} />}
      />
      <ControlButtons onAdd={handleAdd} onNext={handleNext} />
    </Box>
  );
};

RecipesForYouScreen.screenName = 'RecipesForYou' as const;
RecipesForYouScreen.title = 'Для вас';

export default RecipesForYouScreen;