import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { RootStackParamList } from './types';
import WizardStack from './WizardStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={WizardStack.screenName} component={WizardStack} />
    <Stack.Screen name={MainTabs.screenName} component={MainTabs} />
  </Stack.Navigator>
);

export default Screens;
