import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';

const Stack = createNativeStackNavigator<WizardStackParamList>();

const WizardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={WelcomeScreen.screenName} component={WelcomeScreen} />
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
