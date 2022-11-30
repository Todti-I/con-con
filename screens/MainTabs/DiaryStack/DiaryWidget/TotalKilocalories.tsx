import { HStack, Progress, Spacer, Text } from 'native-base';

type Props = {
  current: number;
  max: number;
};

const TotalKilocalories = ({ current, max }: Props) => {
  const isExceeded = max - Math.round(current) < 0;

  return (
    <>
      <HStack space={1} alignItems="flex-end">
        <Text fontSize="2xl" fontWeight="500" children={Math.round(current)} />
        <Text
          fontSize="sm"
          fontWeight="500"
          lineHeight="28px"
          children="ккал"
        />
        <Spacer />
        <Text
          fontSize="2xl"
          fontWeight="500"
          children={Math.round(Math.abs(max - current))}
        />
        <Text
          fontSize="sm"
          fontWeight="500"
          lineHeight="28px"
          children={isExceeded ? 'превышено' : 'осталось'}
        />
      </HStack>
      <Progress
        h="24px"
        value={current}
        max={max}
        colorScheme={isExceeded ? 'red' : 'green'}
      />
    </>
  );
};

export default TotalKilocalories;
