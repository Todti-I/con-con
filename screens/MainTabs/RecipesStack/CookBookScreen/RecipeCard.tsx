import ImageFallback from 'con-con/api/ImageFallback';
import FavoriteRecipesButton from 'con-con/components/FavoriteRecipesButton';
import { MealType, RecipeData } from 'con-con/types/recipes';
import { Box, IBoxProps, Image, Text } from 'native-base';
import { memo } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

type Props = {
  recipe: RecipeData;
  goToRecipe?: () => void;
} & IBoxProps;

const RecipeCard = ({ recipe, goToRecipe, ...props }: Props) => (
  <Box
    position="relative"
    bg="white"
    borderRadius={8}
    overflow="hidden"
    shadow="0"
    {...props}
  >
    <TouchableNativeFeedback onPress={goToRecipe} style={{ height: '100%' }}>
      <Image
        h="156px"
        resizeMode="cover"
        source={{ uri: recipe.cover }}
        fallbackElement={<ImageFallback />}
        alt={recipe.title || 'карточка рецепта'}
      />
      <Box px={2} py={4} flex={1} justifyContent="space-between">
        <Text
          numberOfLines={2}
          fontSize="sm"
          fontWeight="500"
          children={`${recipe.title[0].toUpperCase()}${recipe.title.slice(1)}`}
        />
        <Text
          numberOfLines={1}
          children={`${Math.round(recipe.kilocalories)} ккал`}
        />
      </Box>
    </TouchableNativeFeedback>
    <FavoriteRecipesButton
      position="absolute"
      right={1}
      top={1}
      recipe={recipe}
    />
  </Box>
);

export default memo(RecipeCard, (prevProps, nextProps) => {
  return prevProps.recipe.id === nextProps.recipe.id;
});
