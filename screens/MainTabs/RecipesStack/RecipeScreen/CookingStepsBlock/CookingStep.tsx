import { Text, VStack } from 'native-base';

type Props = {
  stepNumber: number;
  description: string;
};

const CookingStep = ({ stepNumber, description }: Props) => (
  <VStack space={2}>
    <Text
      w="100px"
      py={1}
      bg="tertiary.200"
      borderRadius={8}
      fontSize="lg"
      fontWeight="600"
      textAlign="center"
      textTransform="uppercase"
      children={`Шаг ${stepNumber}`}
    />
    <Text children={description.trim()} />
  </VStack>
);

export default CookingStep;
