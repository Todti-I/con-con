import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import ProfileIcon from 'con-con/icons/ProfileIcon';
import {
  MainTabParamList,
  ProfileStackParamList,
} from 'con-con/types/navigation';
import GeneralScreen from './GeneralScreen';
import PersonalScreen from './PersonalScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = ({
  navigation,
}: BottomTabScreenProps<MainTabParamList, 'Profile'>) => (
  <Stack.Navigator
    screenOptions={{
      animation: 'slide_from_right',
      headerTitleStyle: {
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
      },
    }}
  >
    <Stack.Screen
      name={GeneralScreen.screenName}
      component={GeneralScreen}
      options={GeneralScreen.screenOptions(navigation)}
    />
    <Stack.Screen
      name={PersonalScreen.screenName}
      component={PersonalScreen}
      options={PersonalScreen.screenOptions}
    />
  </Stack.Navigator>
);

ProfileStack.screenName = 'Profile' as const;
ProfileStack.title = 'Профиль';
ProfileStack.Icon = ProfileIcon;

export default ProfileStack;
