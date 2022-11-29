import ClockIcon from 'con-con/icons/ClockIcon';
import { Box, Heading, HStack, Image, Text } from 'native-base';
import { RecipeData } from '../../types';

type Props = {
  recipe: RecipeData;
};

const RecipeCard = ({ recipe }: Props) => (
  <Box
    bg="white"
    h="100%"
    borderRadius={15}
    position="relative"
    overflow="hidden"
  >
    <Image
      flex={1}
      resizeMode="cover"
      source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
      alt={recipe.title}
    />
    <Box
      px={4}
      py={3}
      position="absolute"
      left={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.75)"
      w="full"
    >
      <Heading
        color="text.50"
        fontSize="xl"
        numberOfLines={2}
        children={recipe.title}
      />
      <Text color="text.200" children={`${recipe.kilocalories} ккал`} />
    </Box>
    <HStack
      px={2}
      py={1.5}
      position="absolute"
      left={4}
      top={4}
      space={2}
      bg="rgba(133, 133, 133, 0.5)"
      alignItems="center"
      borderRadius={8}
    >
      <ClockIcon color="text.50" size={4} />
      <Text color="text.50" children={`${recipe.cookingTime} минут`} />
    </HStack>
  </Box>
);

export default RecipeCard;
