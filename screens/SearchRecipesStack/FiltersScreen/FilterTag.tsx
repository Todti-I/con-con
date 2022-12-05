import { Box, Text } from 'native-base';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

type Props = {
  isActive?: boolean;
  text: string;
  onPress?: () => void;
};

const FilterTag = ({ isActive, text, onPress }: Props) => (
  <Box
    mr={4}
    mt={4}
    bg={isActive ? 'tertiary.200' : 'white'}
    borderWidth="2px"
    borderStyle="solid"
    borderColor="tertiary.200"
    borderRadius="full"
    overflow="hidden"
    shadow="1"
  >
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('#34D399', false)}
      onPress={onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 6,
      }}
      children={<Text children={text} />}
    />
  </Box>
);

export default FilterTag;
