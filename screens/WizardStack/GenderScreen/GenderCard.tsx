import { Box, Image, Text } from 'native-base';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';

type Props = {
  color: string;
  activeColor: string;
  text: string;
  image: ImageSourcePropType;
  isActive?: boolean;
  onPress?: () => void;
};

const GenderCard = ({
  color,
  activeColor,
  text,
  image,
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
      <Image boxSize="100px" source={image} alt={text} />
      <Text fontSize="2xl" children={text} />
    </Box>
  </TouchableOpacity>
);

export default GenderCard;
