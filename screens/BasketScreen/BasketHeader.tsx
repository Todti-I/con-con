import EmptyCalendarIcon from 'con-con/icons/EmptyCalendarIcon';
import dayjs from 'dayjs';
import { HStack, Text } from 'native-base';
import { memo } from 'react';

require('dayjs/locale/ru');

const BasketHeader = () => (
  <HStack space={3}>
    <EmptyCalendarIcon size={4} color="text.500" />
    <Text
      color="text.500"
      fontSize="xs"
      fontWeight="500"
      textTransform="uppercase"
      children={dayjs().locale('ru').format('[сегодня,] D MMMM')}
    />
  </HStack>
);

export default memo(BasketHeader);
