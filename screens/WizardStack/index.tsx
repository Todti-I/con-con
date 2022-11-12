import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BirthdayScreen from './BirthdayScreen';
import GenderScreen from './GenderScreen';
import GrowthScreen from './GrowthScreen';
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
