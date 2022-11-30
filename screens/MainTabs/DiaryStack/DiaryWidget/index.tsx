import { useAppContext, useForceUpdate } from 'con-con/hooks';
import { Box, HStack } from 'native-base';
import { memo, useEffect } from 'react';
import BJUProgress from './BJUProgress';
import TotalKilocalories from './TotalKilocalories';

const DiaryWidget = () => {
  const forceUpdate = useForceUpdate();
  const { mealsData, userData, subscriptions } = useAppContext();

  useEffect(() => {
    const unsubscribe = subscriptions.subscribe('meals-data', forceUpdate);

    return () => unsubscribe();
  }, []);

  const allRecipes = Object.values(mealsData.get.meals).flatMap((r) => r);

  const [totalKilocalories, totalCarbohydrate, totalProtein, totalFat] =
    allRecipes.reduce(
      ([kilocalories, carbohydrate, protein, fat], r) => [
        (kilocalories += r.kilocalories * (r.mass / 100)),
        (carbohydrate += r.carbohydrate * (r.mass / 100)),
        (protein += r.protein * (r.mass / 100)),
        (fat += r.fat * (r.mass / 100)),
      ],
      [0, 0, 0, 0]
    );

  return (
    <Box px={3} py={4} bg="white" borderRadius={12}>
      <TotalKilocalories
        current={totalKilocalories}
        max={userData.get.kilocalories}
      />
      <HStack mt={4} space={8}>
        <BJUProgress
          name="Углеводы"
          current={totalCarbohydrate}
          max={userData.get.carbohydrate}
        />
        <BJUProgress
          name="Белки"
          current={totalProtein}
          max={userData.get.protein}
        />
        <BJUProgress name="Жиры" current={totalFat} max={userData.get.fat} />
      </HStack>
    </Box>
  );
};

export default memo(DiaryWidget);
