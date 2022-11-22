import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button } from 'native-base';
import { RootStackParamList } from '../types';
import ArticlesScreen from './ArticlesScreen';
import DiaryScreen from './DiaryScreen';
import ProfileScreen from './ProfileScreen';
import RecipesScreen from './RecipesScreen';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabBarOptions: BottomTabNavigationOptions = {
  tabBarInactiveTintColor: '#5F6368',
  tabBarActiveTintColor: '#1A73E8',
  tabBarStyle: {
    height: 56,
    backgroundColor: 'white',
  },
  tabBarItemStyle: {
    paddingVertical: 8,
  },
  tabBarLabelStyle: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
  },
};

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
        ...tabBarOptions,
      }}
    >
      <Tab.Screen
        name={DiaryScreen.screenName}
        component={DiaryScreen}
        options={{
          headerTitle: DiaryScreen.title,
          tabBarLabel: DiaryScreen.title,
          tabBarIcon: DiaryScreen.Icon,
        }}
      />
      <Tab.Screen
        name={RecipesScreen.screenName}
        component={RecipesScreen}
        options={{
          headerTitle: RecipesScreen.title,
          tabBarLabel: RecipesScreen.title,
          tabBarIcon: RecipesScreen.Icon,
        }}
      />
      <Tab.Screen
        name={ArticlesScreen.screenName}
        component={ArticlesScreen}
        options={{
          headerTitle: ArticlesScreen.title,
          tabBarLabel: ArticlesScreen.title,
          tabBarIcon: ArticlesScreen.Icon,
        }}
      />
      <Tab.Screen
        name={ProfileScreen.screenName}
        component={ProfileScreen}
        options={{
          headerTitle: ProfileScreen.title,
          tabBarLabel: ProfileScreen.title,
          tabBarIcon: ProfileScreen.Icon,
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
