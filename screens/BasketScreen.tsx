import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Box, Text } from 'native-base';
import { TabParamList } from './types';

const BasketScreen = (props: BottomTabScreenProps<TabParamList, 'Basket'>) => (
  <Box
    flex={1}
    backgroundColor="#fff"
    alignItems="center"
    justifyContent="center"
  >
    <Text>BasketScreen</Text>
  </Box>
);

BasketScreen.screenName = 'Basket' as const;
BasketScreen.title = 'Корзина';

export default BasketScreen;
