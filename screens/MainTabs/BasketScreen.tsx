import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Box, Text } from 'native-base';
import { MainTabParamList } from './types';

const BasketScreen = (
  props: BottomTabScreenProps<MainTabParamList, 'Basket'>
) => (
  <Box flex={1} bg="#F7F7F7" alignItems="center" justifyContent="center">
    <Text>BasketScreen</Text>
  </Box>
);

BasketScreen.screenName = 'Basket' as const;
BasketScreen.title = 'Корзина';

export default BasketScreen;
