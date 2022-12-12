import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import { useAppContext } from 'con-con/hooks';
import {
  MainTabParamList,
  ProfileStackParamList,
} from 'con-con/types/navigation';
import { Box, Divider } from 'native-base';
import ProfileDataRow from '../ProfileDataRow';

const GeneralScreen = ({
  navigation,
}: NativeStackScreenProps<ProfileStackParamList, 'General'>) => {
  const { userData } = useAppContext();

  return (
    <Box flex={1} p={4} bg="#F7F7F7">
      <ProfileDataRow
        isFirst
        text="Личные данные"
        subText="Рост, вес, уровень активности"
        onPress={() => navigation.navigate('Personal')}
      />
      <Divider />
      <ProfileDataRow
        text="Скорректировать цель"
        subText={`${userData.get.kilocalories} ккал/день`}
      />
      <Divider />
      <ProfileDataRow isLast text="Особенности рациона и предпочтения в еде" />
    </Box>
  );
};

GeneralScreen.screenName = 'General' as const;
GeneralScreen.screenOptions = (
  navigation: BottomTabNavigationProp<MainTabParamList, 'Profile', undefined>
) => ({
  title: 'Профиль',
  headerLeft: () => <Box w="16px" />,
  headerRight: () => <BasketButton navigateToBasket={navigation.navigate} />,
});

export default GeneralScreen;
