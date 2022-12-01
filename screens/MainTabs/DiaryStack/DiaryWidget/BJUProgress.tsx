import { Progress, Text, VStack } from 'native-base';

type Props = {
  name: string;
  current: number;
  max: number;
};

const BJUProgress = ({ name, current, max }: Props) => (
  <VStack space={0.5} flex={1} alignItems="center">
    <Text fontWeight="500" children={name} />
    <Progress w="full" h="4px" value={current} max={max} />
    <Text children={`${Math.round(current)} / ${max} г`} />
  </VStack>
);

export default BJUProgress;
