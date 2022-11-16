import { Box, IIconProps, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

type Props = {
  color: string;
  activeColor: string;
  text: string;
  Icon: (props: IIconProps) => JSX.Element;
  isActive?: boolean;
  onPress?: () => void;
};

const GenderCard = ({
  color,
  activeColor,
  text,
  Icon,
  isActive,
  onPress,
}: Props) => (
  <TouchableOpacity activeOpacity={0.8} style={{ flex: 1 }} onPress={onPress}>
    <Box
      p={4}
      bg={color}
      borderWidth="3px"
      borderStyle="solid"
      borderColor={isActive ? activeColor : color}
      borderRadius={8}
      alignItems="center"
    >
      <Icon color="text.900" size="100px" />
      <Text fontSize="2xl" children={text} />
    </Box>
  </TouchableOpacity>
);

export default GenderCard;
