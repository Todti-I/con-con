import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useSubscriptions, useValue } from 'con-con/hooks';
import {
  RootStackParamList,
  WizardStackParamList,
} from 'con-con/types/navigation';
import { WizardData } from 'con-con/types/wizard-data';
import { KeyboardAvoidingView } from 'native-base';
import { useMemo } from 'react';
import ActivityTypeScreen from './ActivityTypeScreen';
import BirthdayScreen from './BirthdayScreen';
import GenderScreen from './GenderScreen';
import GrowthScreen from './GrowthScreen';
import PreferencesScreen from './PreferencesScreen';
import WeightScreen from './WeightScreen';
import WelcomeScreen from './WelcomeScreen';
import { WizardProvider } from './wizard-context';
import WizardProgress from './WizardProgress';

const Stack = createNativeStackNavigator<WizardStackParamList>();

const WizardStack = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Wizard'>) => {
  const pageNumber = useValue(0);
  const data = useValue<Partial<WizardData>>({});
  const subscriptions = useSubscriptions();

  const contextValue = useMemo(() => {
    const onComplete = () => {
      navigation.replace('MainTabs');
    };

    return { pageNumber, data, subscriptions, onComplete };
  }, []);

  return (
    <WizardProvider value={contextValue}>
      <KeyboardAvoidingView
        key="keyboardAvoidingView"
        flex={1}
        behavior="height"
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name={WelcomeScreen.screenName}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name={GenderScreen.screenName}
            component={GenderScreen}
          />
          <Stack.Screen
            name={BirthdayScreen.screenName}
            component={BirthdayScreen}
          />
          <Stack.Screen
            name={GrowthScreen.screenName}
            component={GrowthScreen}
          />
          <Stack.Screen
            name={WeightScreen.screenName}
            component={WeightScreen}
          />
          <Stack.Screen
            name={ActivityTypeScreen.screenName}
            component={ActivityTypeScreen}
          />
          <Stack.Screen
            name={PreferencesScreen.screenName}
            component={PreferencesScreen}
          />
        </Stack.Navigator>
        <WizardProgress />
      </KeyboardAvoidingView>
    </WizardProvider>
  );
};

WizardStack.screenName = 'Wizard' as const;

export default WizardStack;
