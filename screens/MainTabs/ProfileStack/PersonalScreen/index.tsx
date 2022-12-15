import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { ProfileStackParamList } from 'con-con/types/navigation';
import { Box, Divider } from 'native-base';
import ActivityTypeRow from './ActivityTypeRow';
import AgeRow from './AgeRow';
import GenderRow from './GenderRow';
import GrowthRow from './GrowthRow';
import WeightRow from './WeightRow';

const PersonalScreen = (
  _: NativeStackScreenProps<ProfileStackParamList, 'Personal'>
) => (
  <Box flex={1} p={4} bg="#F7F7F7">
    <GenderRow />
    <Divider />
    <AgeRow />
    <Divider />
    <GrowthRow />
    <Divider />
    <WeightRow />
    <Divider />
    <ActivityTypeRow />
  </Box>
);

PersonalScreen.screenName = 'Personal' as const;
PersonalScreen.screenOptions = {
  title: 'Личные данные',
} as NativeStackNavigationOptions;

export default PersonalScreen;
