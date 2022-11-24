import EmptyIcon from 'con-con/icons/EmptyIcon';
import { Text, VStack } from 'native-base';
import { memo } from 'react';

const BasketEmpty = () => (
  <VStack mt="40%" mx={4} space={4} alignItems="center">
    <EmptyIcon color="text.400" size="98px" />
    <Text
      color="text.500"
      textAlign="center"
      fontSize="xl"
      children={'В вашей корзине ещё нет товаров'}
    />
    <Text
      color="text.500"
      textAlign="center"
      fontSize="xl"
      children="Добавьте продукты, нажав кнопку снизу"
    />
  </VStack>
);

export default memo(BasketEmpty);
