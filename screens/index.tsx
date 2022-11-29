import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppContext } from 'con-con/hooks';
import BasketScreen from './BasketScreen';
import MainTabs from './MainTabs';
import { RootStackParamList } from './types';
import WizardStack from './WizardStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens = () => {
  const { isWizardComplete } = useAppContext();

  return (
    <Stack.Navigator
      initialRouteName={isWizardComplete.get ? 'MainTabs' : 'Wizard'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={WizardStack.screenName} component={WizardStack} />
      <Stack.Screen name={MainTabs.screenName} component={MainTabs} />
      <Stack.Screen
        name={BasketScreen.screenName}
        options={BasketScreen.screenOptions}
        component={BasketScreen}
      />
    </Stack.Navigator>
  );
};

export default Screens;
