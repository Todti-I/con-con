import { useAppContext, useForceUpdate } from 'con-con/hooks';
import SolidPlusIcon from 'con-con/icons/SolidHeartPlusIcon';
import { MealType } from 'con-con/types/recipes';
import { Box, HStack, IconButton, Text } from 'native-base';
import { memo, useEffect } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { useDiaryContext } from '../context';
import mealTypeData from '../meal-type-data';

type Props = {
  mealType: MealType;
  goToMealScreen: () => void;
  goToAddMealScreen: () => void;
};

const MealCard = ({ mealType, goToMealScreen, goToAddMealScreen }: Props) => {
  const { mealsData, subscriptions: globalSubscriptions } = useAppContext();
  const { subscriptions } = useDiaryContext();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const unsubscribe1 = subscriptions.subscribe(
      `meal-card-${mealType}`,
      forceUpdate
    );
    const unsubscribe2 = globalSubscriptions.subscribe(
      'is-wizard-complete',
      forceUpdate
    );

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  const recipes = mealsData.get.meals[mealType];
  const { name, Icon } = mealTypeData[mealType];
  const totalKilocalories = recipes.reduce(
    (result, r) => (result += r.kilocalories * (r.mass / 100)),
    0
  );

  const hasRecipes = recipes.length > 0;

  return (
    <Box borderRadius={8} bg="white" position="relative" overflow="hidden">
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#C4B5FD', false)}
        onPress={goToMealScreen}
      >
        <HStack p={3} space={2}>
          <Icon m={3} size={6} color="violet.600" />
          <Box pr={12} flex={1} alignSelf="center">
            <Text fontWeight="500" fontSize="md" children={name} />
            <Text
              color={hasRecipes ? 'text.500' : 'text.400'}
              fontSize="xs"
              fontWeight="500"
              children={
                recipes.map((r) => r.title).join('\n') || 'Ничего не выбрано'
              }
            />
          </Box>
        </HStack>
        {hasRecipes && <Box mx={6} h="1px" bg="muted.300" />}
        {hasRecipes && (
          <Text
            my={1}
            fontWeight="500"
            textAlign="center"
            children={`${Math.round(totalKilocalories)} ккал`}
          />
        )}
      </TouchableNativeFeedback>
      <IconButton
        top={3}
        right={3}
        position="absolute"
        boxSize={12}
        colorScheme="violet"
        icon={<SolidPlusIcon size={6} />}
        onPress={goToAddMealScreen}
      />
    </Box>
  );
};

export default memo(MealCard, (prevProps, nextProps) => {
  return prevProps.mealType === nextProps.mealType;
});
