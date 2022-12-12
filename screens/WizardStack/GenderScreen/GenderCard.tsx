import { Box, IIconProps, Text } from 'native-base';
import { TouchableOpacity as TouchableOpacityGesture } from 'react-native-gesture-handler';
import { TouchableOpacity as TouchableOpacityNative } from 'react-native';

type Props = {
  color: string;
  activeColor: string;
  text: string;
  Icon: (props: IIconProps) => JSX.Element;
  isActive?: boolean;
  onPress?: () => void;
  isGesture?: boolean;
  iconSize?: string;
};

const GenderCard = ({
  color,
  activeColor,
  text,
  Icon,
  isActive,
  onPress,
  isGesture = true,
  iconSize = '100px',
}: Props) => {
  const TouchableOpacity = isGesture
    ? TouchableOpacityGesture
    : TouchableOpacityNative;

  return (
    <Box flex={1}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Box
          p={4}
          bg={color}
          borderWidth="3px"
          borderStyle="solid"
          borderColor={isActive ? activeColor : color}
          borderRadius={8}
          alignItems="center"
        >
          <Icon color="text.900" size={iconSize} />
          <Text fontSize="2xl" children={text} />
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default GenderCard;
