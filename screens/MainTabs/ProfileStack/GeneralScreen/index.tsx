import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import {
  MainTabParamList,
  ProfileStackParamList,
} from 'con-con/types/navigation';
import { Box, Divider } from 'native-base';
import ProfileDataRow from '../ProfileDataRow';
import KilocaloriesRow from './KilocaloriesRow';
import PreferencesRow from './PreferencesRow';
import UpdateDietRow from './UpdateDietRow';

const GeneralScreen = ({
  navigation,
}: NativeStackScreenProps<ProfileStackParamList, 'General'>) => (
  <Box flex={1} p={4} bg="#F7F7F7">
    <ProfileDataRow
      isFirst
      text="Личные данные"
      subText="Рост, вес, уровень активности"
      onPress={() => navigation.navigate('Personal')}
    />
    <Divider />
    <KilocaloriesRow />
    <Divider />
    <PreferencesRow />
    <Divider />
    <UpdateDietRow />
  </Box>
);

GeneralScreen.screenName = 'General' as const;
GeneralScreen.screenOptions = (
  navigation: BottomTabNavigationProp<MainTabParamList, 'Profile', undefined>
) => ({
  title: 'Профиль',
  headerLeft: () => <Box w="16px" />,
  headerRight: () => <BasketButton navigateToBasket={navigation.navigate} />,
});

export default GeneralScreen;
