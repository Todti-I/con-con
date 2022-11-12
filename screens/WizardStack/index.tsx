import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityTypeScreen from './ActivityTypeScreen';
import BirthdayScreen from './BirthdayScreen';
import DesiredWeightScreen from './DesiredWeightScreen';
import EmailScreen from './EmailScreen';
import GenderScreen from './GenderScreen';
import GrowthScreen from './GrowthScreen';
import PreferencesScreen from './PreferencesScreen';
import WeightScreen from './WeightScreen';
import WelcomeScreen from './WelcomeScreen';

const Stack = createNativeStackNavigator<WizardStackParamList>();

const WizardStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name={WelcomeScreen.screenName} component={WelcomeScreen} />
    <Stack.Screen name={GenderScreen.screenName} component={GenderScreen} />
    <Stack.Screen name={BirthdayScreen.screenName} component={BirthdayScreen} />
    <Stack.Screen name={GrowthScreen.screenName} component={GrowthScreen} />
    <Stack.Screen name={WeightScreen.screenName} component={WeightScreen} />
    <Stack.Screen
      name={DesiredWeightScreen.screenName}
      component={DesiredWeightScreen}
    />
    <Stack.Screen
      name={ActivityTypeScreen.screenName}
      component={ActivityTypeScreen}
    />
    <Stack.Screen
      name={PreferencesScreen.screenName}
      component={PreferencesScreen}
    />
    <Stack.Screen name={EmailScreen.screenName} component={EmailScreen} />
  </Stack.Navigator>
);

export type WizardStackParamList = {
  Welcome: undefined;
  Gender: undefined;
  Birthday: undefined;
  Growth: undefined;
  Weight: undefined;
  DesiredWeight: undefined;
  ActivityType: undefined;
  Preferences: undefined;
  Email: undefined;
};

export default WizardStack;
