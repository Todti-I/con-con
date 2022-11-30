import SolidHeartIcon from 'con-con/icons/SolidHeartIcon';
import { Text, VStack } from 'native-base';
import { memo } from 'react';

const FavoriteEmpty = () => (
  <VStack mt="40%" mx={4} space={4} alignItems="center">
    <SolidHeartIcon color="text.400" size="98px" />
    <Text
      color="text.500"
      textAlign="center"
      fontSize="xl"
      children="У вас ещё нет избранных рецептов"
    />
  </VStack>
);

export default memo(FavoriteEmpty);
