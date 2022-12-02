import ClockIcon from 'con-con/icons/ClockIcon';
import { RecipeData } from 'con-con/types/recipes';
import { Box, Heading, HStack, Image, Text } from 'native-base';
import { memo } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

type Props = {
  recipe: RecipeData;
  goToRecipe?: () => void;
};

const RecipeCard = ({ recipe, goToRecipe }: Props) => (
  <Box
    bg="white"
    h="100%"
    borderRadius={15}
    position="relative"
    overflow="hidden"
  >
    <TouchableNativeFeedback
      disabled={!goToRecipe}
      onPress={goToRecipe}
      style={{ height: '100%' }}
    >
      <Image
        flex={1}
        resizeMode="cover"
        source={{ uri: recipe.cover }}
        alt={recipe.title || 'карточка рецепта'}
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
        <Text
          color="text.200"
          children={`${Math.round(recipe.kilocalories)} ккал`}
        />
      </Box>
      {recipe.cookingTime > 0 && (
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
      )}
    </TouchableNativeFeedback>
  </Box>
);

export default memo(RecipeCard, (prevProps, nextProps) => {
  return prevProps.recipe.id === nextProps.recipe.id;
});
