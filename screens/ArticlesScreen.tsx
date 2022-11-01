import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Box, Text } from 'native-base';
import { TabParamList } from './types';

const ArticlesScreen = (
  props: BottomTabScreenProps<TabParamList, 'Articles'>
) => (
  <Box
    flex={1}
    backgroundColor="#fff"
    alignItems="center"
    justifyContent="center"
  >
    <Text>ArticlesScreen</Text>
  </Box>
);

ArticlesScreen.screenName = 'Articles' as const;
ArticlesScreen.title = 'Статьи';

export default ArticlesScreen;
