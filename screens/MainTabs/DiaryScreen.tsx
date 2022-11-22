import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Box, Text } from 'native-base';
import { MainTabParamList } from './types';

const DiaryScreen = (
  props: BottomTabScreenProps<MainTabParamList, 'Diary'>
) => (
  <Box flex={1} bg="#F7F7F7" alignItems="center" justifyContent="center">
    <Text>DiaryScreen</Text>
  </Box>
);

DiaryScreen.screenName = 'Diary' as const;
DiaryScreen.title = 'Дневник';

export default DiaryScreen;
