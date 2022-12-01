import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import BasketIcon from 'con-con/icons/BasketIcon';
import DiaryIcon from 'con-con/icons/DiaryIcon';
import { Box, IconButton } from 'native-base';
import { MainTabParamList } from '../types';
import AddMealTabs from './AddMealTabs';
import { DiaryProvider } from './context';
import MealScreen from './MealScreen';
import MealsScreen from './MealsScreen';
import { DiaryStackParamList } from './types';

const Stack = createNativeStackNavigator<DiaryStackParamList>();

const DiaryStack = ({
  navigation,
}: BottomTabScreenProps<MainTabParamList, 'Diary'>) => (
  <DiaryProvider>
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        headerTitleStyle: {
          fontWeight: '600',
          fontFamily: 'Montserrat-SemiBold',
        },
        headerRight: () => (
          <BasketButton navigateToBasket={navigation.navigate} />
        ),
      }}
    >
      <Stack.Screen
        name={MealsScreen.screenName}
        component={MealsScreen}
        options={MealsScreen.screenOptions}
      />
      <Stack.Screen name={MealScreen.screenName} component={MealScreen} />
      <Stack.Screen
        name={AddMealTabs.screenName}
        component={AddMealTabs}
        options={AddMealTabs.screenOptions}
      />
    </Stack.Navigator>
  </DiaryProvider>
);

DiaryStack.screenName = 'Diary' as const;
DiaryStack.title = 'Дневник';
DiaryStack.Icon = DiaryIcon;

export default DiaryStack;
