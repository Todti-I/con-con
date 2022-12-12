import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useAppContext } from 'con-con/hooks';
import { ProfileStackParamList } from 'con-con/types/navigation';
import { Box, Divider } from 'native-base';
import ProfileDataRow from './ProfileDataRow';

const PersonalScreen = (
  _: NativeStackScreenProps<ProfileStackParamList, 'Personal'>
) => {
  const { wizardData, userData } = useAppContext();

  const gender = wizardData.get?.gender === 'female' ? 'Женский' : 'Мужской';

  const age = Math.abs(
    new Date(
      Date.now() - new Date(wizardData.get?.birthday || Date.now()).getTime()
    ).getUTCFullYear() - 1970
  ).toString();

  const growth = (wizardData.get?.growth || 0).toString();
  const weight = (wizardData.get?.weight || 0).toString();

  const activityType =
    wizardData.get?.activityType === 'high'
      ? 'Высокая'
      : wizardData.get?.activityType === 'medium'
      ? 'Средняя'
      : 'Низкая';

  return (
    <Box flex={1} p={4} bg="#F7F7F7">
      <ProfileDataRow isFirst isHorizontal text="Пол" subText={gender} />
      <Divider />
      <ProfileDataRow isHorizontal text="Возраст" subText={age} />
      <Divider />
      <ProfileDataRow isHorizontal text="Рост" subText={growth} />
      <Divider />
      <ProfileDataRow isHorizontal text="Вес" subText={weight} />
      <Divider />
      <ProfileDataRow
        isLast
        isHorizontal
        text="Уровень активности"
        subText={activityType}
      />
    </Box>
  );
};

PersonalScreen.screenName = 'Personal' as const;
PersonalScreen.screenOptions = {
  title: 'Личные данные',
} as NativeStackNavigationOptions;

export default PersonalScreen;
