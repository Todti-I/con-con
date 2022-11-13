import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Box, Text } from 'native-base';
import { TabParamList } from './types';

const DiaryScreen = (props: BottomTabScreenProps<TabParamList, 'Diary'>) => (
  <Box
    flex={1}
    backgroundColor="#fff"
    alignItems="center"
    justifyContent="center"
  >
    <Text>DiaryScreen</Text>
  </Box>
);

DiaryScreen.screenName = 'Diary' as const;
DiaryScreen.title = 'Дневник';

export default DiaryScreen;
