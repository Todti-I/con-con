import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ArticlesIcon from 'con-con/icons/ArticlesIcon';
import { MainTabParamList } from 'con-con/types/navigation';
import { Box, Text } from 'native-base';

const ArticlesScreen = (
  props: BottomTabScreenProps<MainTabParamList, 'Articles'>
) => (
  <Box flex={1} bg="#F7F7F7" alignItems="center" justifyContent="center">
    <Text>ArticlesScreen</Text>
  </Box>
);

ArticlesScreen.screenName = 'Articles' as const;
ArticlesScreen.title = 'Статьи';
ArticlesScreen.Icon = ArticlesIcon;

export default ArticlesScreen;
