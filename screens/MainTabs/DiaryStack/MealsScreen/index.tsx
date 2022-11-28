import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateRow from 'con-con/components/DateRow';
import { ScrollView, VStack } from 'native-base';
import DiaryWidget from '../DiaryWidget';
import { DiaryStackParamList, MealType } from '../types';
import MealCard from './MealCard';

const mealTypes: MealType[] = ['breakfast', 'dinner', 'lunch', 'supper'];

const MealsScreen = ({
  navigation,
}: NativeStackScreenProps<DiaryStackParamList, 'Meals'>) => (
  <ScrollView flex={1} contentContainerStyle={{ padding: 16 }} bg="#F7F7F7">
    <DiaryWidget />
    <DateRow mt={8} mb={4} />
    <VStack space={2}>
      {mealTypes.map((mealType) => (
        <MealCard
          key={mealType}
          mealType={mealType}
          goToMealScreen={() => navigation.navigate('Meal', { mealType })}
          goToAddMealScreen={() => navigation.navigate('AddMeal', { mealType })}
        />
      ))}
    </VStack>
  </ScrollView>
);

MealsScreen.screenName = 'Meals' as const;

export default MealsScreen;