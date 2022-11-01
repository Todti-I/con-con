import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ArticlesScreen from './ArticlesScreen';
import BasketScreen from './BasketScreen';
import DiaryScreen from './DiaryScreen';
import RecipesScreen from './RecipesScreen';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const MainTabsScreen = () => (
  <Tab.Navigator
    initialRouteName="Diary"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#DDDDDD',
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
);

export default MainTabsScreen;
