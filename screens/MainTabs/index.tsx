import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from 'con-con/types/navigation';
import ArticlesScreen from './ArticlesScreen';
import DiaryStack from './DiaryStack';
import { headerOptions, tabBarOptions } from './options';
import ProfileScreen from './ProfileScreen';
import RecipesStack from './RecipesStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'MainTabs'>) => (
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
      name={DiaryStack.screenName}
      component={DiaryStack}
      options={{
        headerShown: false,
        tabBarLabel: DiaryStack.title,
        tabBarIcon: DiaryStack.Icon,
      }}
    />
    <Tab.Screen
      name={RecipesStack.screenName}
      component={RecipesStack}
      options={{
        headerShown: false,
        headerTitle: RecipesStack.title,
        tabBarLabel: RecipesStack.title,
        tabBarIcon: RecipesStack.Icon,
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
);

MainTabs.screenName = 'MainTabs' as const;

export default MainTabs;
