import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button } from 'native-base';
import ArticlesScreen from './ArticlesScreen';
import { RootStackParamList } from '../types';
import { MainTabParamList } from './types';
import DiaryScreen from './DiaryScreen';
import RecipesScreen from './RecipesScreen';
import BasketScreen from './BasketScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'MainTabs'>) => (
  <Box flex={1} bg="red.500">
    <Tab.Navigator
      initialRouteName="Diary"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
        },
        tabBarStyle: {
          paddingHorizontal: 10,
          height: 40,
        },
        tabBarActiveBackgroundColor: '#95BCF2',
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          color: 'black',
          fontWeight: '700',
          fontSize: 15,
          marginLeft: 0,
          marginTop: 0,
        },
        tabBarIconStyle: { display: 'none' },
      }}
    >
      <Tab.Screen
        name={DiaryScreen.screenName}
        component={DiaryScreen}
        options={{
          headerTitle: DiaryScreen.title,
          tabBarLabel: DiaryScreen.title,
        }}
      />
      <Tab.Screen
        name={RecipesScreen.screenName}
        component={RecipesScreen}
        options={{
          headerTitle: RecipesScreen.title,
          tabBarLabel: RecipesScreen.title,
        }}
      />
      <Tab.Screen
        name={ArticlesScreen.screenName}
        component={ArticlesScreen}
        options={{
          headerTitle: ArticlesScreen.title,
          tabBarLabel: ArticlesScreen.title,
        }}
      />
      <Tab.Screen
        name={BasketScreen.screenName}
        component={BasketScreen}
        options={{
          headerTitle: BasketScreen.title,
          tabBarLabel: BasketScreen.title,
        }}
      />
    </Tab.Navigator>
    <Button
      // display="none"
      top="8px"
      right="10px"
      position="absolute"
      onPress={() => navigation.replace('Wizard')}
      children="Go to wizard"
    />
  </Box>
);

MainTabs.screenName = 'MainTabs' as const;

export default MainTabs;
