import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  Box,
  ChevronRightIcon,
  Flex,
  HStack,
  Icon,
  IStackProps,
  Stack,
  Text,
  VStack,
} from 'native-base';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

type Props = {
  text: string;
  subText?: string;
  onPress?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  isHorizontal?: boolean;
};

const ProfileDataRow = ({
  text,
  subText,
  onPress,
  isFirst,
  isLast,
  isHorizontal,
}: Props) => (
  <Flex
    bg="white"
    overflow="hidden"
    borderTopRadius={isFirst ? 8 : 0}
    borderBottomRadius={isLast ? 8 : 0}
  >
    <TouchableNativeFeedback
      onPress={onPress}
      style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
    >
      <Stack
        space={0.5}
        flex={1}
        direction={isHorizontal ? 'row' : 'column'}
        alignItems={isHorizontal ? 'center' : 'flex-start'}
        justifyContent="space-between"
      >
        <Text fontSize="md" numberOfLines={subText ? 1 : 2} children={text} />
        {subText && (
          <Text
            w={isHorizontal ? '75px' : 'auto'}
            textAlign="center"
            color="text.500"
            children={subText}
          />
        )}
      </Stack>
      <ChevronRightIcon ml={4} />
    </TouchableNativeFeedback>
  </Flex>
);

export default ProfileDataRow;
