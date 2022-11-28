import { HStack, Progress, Spacer, Text } from 'native-base';

type Props = {
  current: number;
  max: number;
};

const TotalKilocalories = ({ current, max }: Props) => {
  const isExceeded = max - current < 0;

  return (
    <>
      <HStack space={1} alignItems="flex-end">
        <Text fontSize="2xl" fontWeight="500" children={current} />
        <Text fontSize="sm" lineHeight="28px" children="набрано" />
        <Spacer />
        <Text
          fontSize="2xl"
          fontWeight="500"
          children={Math.abs(max - current)}
        />
        <Text
          fontSize="sm"
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
