import { Box, Text } from 'native-base';

type Props = {
  name: string;
  value: number;
};

const BJUBlock = ({ name, value }: Props) => (
  <Box p={2} flex={0.31} bg="tertiary.200" borderRadius={8} shadow="1">
    <Text fontSize="md" textAlign="center" children={name} />
    <Box mt={2} py={1.5} bg="white" borderRadius={8} shadow="0">
      <Text
        fontSize="xl"
        fontWeight="500"
        textAlign="center"
        children={value}
      />
      <Text fontSize="md" textAlign="center" children="г" />
    </Box>
  </Box>
);

export default BJUBlock;
