import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useSubscriptions, useValue } from 'con-con/hooks';
import { WizardData } from 'con-con/types/wizard-data';
import { KeyboardAvoidingView } from 'native-base';
import { useMemo } from 'react';
import { RootStackParamList } from '../types';
import ActivityTypeScreen from './ActivityTypeScreen';
import BirthdayScreen from './BirthdayScreen';
import DesiredWeightScreen from './DesiredWeightScreen';
import EmailScreen from './EmailScreen';
import GenderScreen from './GenderScreen';
import GrowthScreen from './GrowthScreen';
import PreferencesScreen from './PreferencesScreen';
import { WizardStackParamList } from './types';
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
        <WizardProgress />
      </KeyboardAvoidingView>
    </WizardProvider>
  );
};

WizardStack.screenName = 'Wizard' as const;

export default WizardStack;
