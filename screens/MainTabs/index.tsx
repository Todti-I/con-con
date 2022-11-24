import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BasketIcon from 'con-con/icons/BasketIcon';
import { Box, Button, IconButton } from 'native-base';
import { RootStackParamList } from '../types';
import ArticlesScreen from './ArticlesScreen';
import DiaryScreen from './DiaryScreen';
import { headerOptions, tabBarOptions } from './options';
import ProfileScreen from './ProfileScreen';
import RecipesScreen from './RecipesScreen';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'MainTabs'>) => (
  <Box flex={1}>
    <Tab.Navigator
      initialRouteName="Diary"
      screenOptions={{
        ...headerOptions({
          goToBasket: () => navigation.navigate('Basket'),
          goToWizard: () => navigation.replace('Wizard'),
        }),
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
      display="none"
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
