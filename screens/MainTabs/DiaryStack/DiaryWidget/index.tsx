import { useForceUpdate } from 'con-con/hooks';
import { Box, HStack } from 'native-base';
import { memo, useEffect } from 'react';
import { useDiaryContext } from '../context';
import BJUProgress from './BJUProgress';
import TotalKilocalories from './TotalKilocalories';

const DiaryWidget = () => {
  const { meals, subscriptions } = useDiaryContext();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const unsubscribe = subscriptions.subscribe('diary-widget', forceUpdate);

    return () => unsubscribe();
  }, []);

  const allRecipes = [...meals.get.values()].flatMap((r) => r);

  const [totalKilocalories, totalCarbohydrate, totalProtein, totalFat] =
    allRecipes.reduce(
      ([kilocalories, carbohydrate, protein, fat], r) => [
        (kilocalories += r.kilocalories),
        (carbohydrate += r.carbohydrate),
        (protein += r.protein),
        (fat += r.fat),
      ],
      [0, 0, 0, 0]
    );

  return (
    <Box px={3} py={4} bg="white" borderRadius={12}>
      <TotalKilocalories current={totalKilocalories} max={2400} />
      <HStack mt={4} space={8}>
        <BJUProgress name="Углеводы" current={totalCarbohydrate} max={274} />
        <BJUProgress name="Белки" current={totalProtein} max={110} />
        <BJUProgress name="Жиры" current={totalFat} max={73} />
      </HStack>
    </Box>
  );
};

export default memo(DiaryWidget);
