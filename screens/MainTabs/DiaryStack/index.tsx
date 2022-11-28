import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BasketIcon from 'con-con/icons/BasketIcon';
import DiaryIcon from 'con-con/icons/DiaryIcon';
import { Box, IconButton } from 'native-base';
import { MainTabParamList } from '../types';
import { DiaryProvider } from './context';
import MealsScreen from './MealsScreen';
import { DiaryStackParamList } from './types';

const Stack = createNativeStackNavigator<DiaryStackParamList>();

const DiaryStack = ({
  navigation,
}: BottomTabScreenProps<MainTabParamList, 'Diary'>) => (
  <DiaryProvider>
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <Box w="16px" />,
        headerTitle: 'Дневник',
        headerRight: () => (
          <IconButton
            colorScheme="light"
            icon={<BasketIcon />}
            onPress={() => navigation.navigate('Basket')}
          />
        ),
      }}
    >
      <Stack.Screen name={MealsScreen.screenName} component={MealsScreen} />
    </Stack.Navigator>
  </DiaryProvider>
);

DiaryStack.screenName = 'Diary' as const;
DiaryStack.title = 'Дневник';
DiaryStack.Icon = DiaryIcon;

export default DiaryStack;
