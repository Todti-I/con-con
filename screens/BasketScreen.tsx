import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Box, Text } from 'native-base';
import { RootStackParamList } from './types';

const BasketScreen = (
  props: NativeStackScreenProps<RootStackParamList, 'Basket'>
) => (
  <Box flex={1} bg="#F7F7F7" alignItems="center" justifyContent="center">
    <Text>BasketScreen</Text>
  </Box>
);

BasketScreen.screenName = 'Basket' as const;
BasketScreen.screenOptions = {
  headerShown: true,
  headerTitle: 'Список покупок',
} as NativeStackNavigationOptions;

export default BasketScreen;
