import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { ScrollView, Text } from 'native-base';
import { DiaryStackParamList } from '../types';

const AddMealScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<DiaryStackParamList, 'AddMeal'>) => {
  return (
    <ScrollView flex={1} contentContainerStyle={{ padding: 16 }} bg="#F7F7F7">
      <Text children={route.params.mealType} />
    </ScrollView>
  );
};

AddMealScreen.screenName = 'AddMeal' as const;
AddMealScreen.screenOptions = {
  animation: 'default',
  headerTitle: 'Добавить прием пищи',
} as NativeStackNavigationOptions;

export default AddMealScreen;
