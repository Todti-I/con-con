import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AddIcon, NativeBaseProvider } from 'native-base';
import CreatePostScreen from './screens/CreatePostScreen';
import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';
import { TabParamList } from './screens/types';

// const Stack = createNativeStackNavigator<StackParamList>();

const Tab = createBottomTabNavigator<TabParamList>();

const App = () => (
  <NativeBaseProvider>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: () => <AddIcon />,
          // statusBarColor: '#f4511e',
          // animation: 'fade_from_bottom',
          // orientation: 'portrait_up',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: `Details ${route.params.itemId}`,
          })}
        />
        <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  </NativeBaseProvider>
);

export default App;
