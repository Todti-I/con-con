import EmptyIcon from 'con-con/icons/EmptyIcon';
import { Text, VStack } from 'native-base';
import { memo } from 'react';

const NotFoundIngredients = () => (
  <VStack mt="30%" mx={4} space={4} alignItems="center">
    <EmptyIcon color="text.400" size="98px" />
    <Text
      color="text.500"
      textAlign="center"
      fontSize="xl"
      children="Ингредиенты не найдены"
    />
  </VStack>
);

export default memo(NotFoundIngredients);
