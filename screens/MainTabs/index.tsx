import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from 'con-con/types/navigation';
import DiaryStack from './DiaryStack';
import { headerOptions, tabBarOptions } from './options';
import ProfileStack from './ProfileStack';
import RecipesStack from './RecipesStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'MainTabs'>) => (
  <Tab.Navigator
    initialRouteName="Diary"
    screenOptions={{
      headerShown: false,
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
        tabBarLabel: DiaryStack.title,
        tabBarIcon: DiaryStack.Icon,
      }}
    />
    <Tab.Screen
      name={RecipesStack.screenName}
      component={RecipesStack}
      options={{
        headerTitle: RecipesStack.title,
        tabBarLabel: RecipesStack.title,
        tabBarIcon: RecipesStack.Icon,
      }}
    />
    <Tab.Screen
      name={ProfileStack.screenName}
      component={ProfileStack}
      options={{
        headerTitle: ProfileStack.title,
        tabBarLabel: ProfileStack.title,
        tabBarIcon: ProfileStack.Icon,
      }}
    />
  </Tab.Navigator>
);

MainTabs.screenName = 'MainTabs' as const;

export default MainTabs;
