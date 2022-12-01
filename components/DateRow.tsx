import EmptyCalendarIcon from 'con-con/icons/EmptyCalendarIcon';
import dayjs from 'dayjs';
import { HStack, IStackProps, Text } from 'native-base';
import { memo } from 'react';

require('dayjs/locale/ru');

const DateRow = (props: IStackProps) => (
  <HStack space={3} justifyContent="center" {...props}>
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

export default memo(DateRow);
