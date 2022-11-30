import FavoriteRecipesButton from 'con-con/components/FavoriteRecipesButton';
import RecipeData from 'con-con/types/recipe-data';
import { Box, IBoxProps, Image, Text } from 'native-base';
import { memo } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

type Props = {
  recipe: RecipeData;
  onAdd?: () => void;
  goToRecipe?: () => void;
} & IBoxProps;

const RecipeCard = ({ recipe, onAdd, goToRecipe, ...props }: Props) => (
  <Box
    position="relative"
    bg="white"
    borderRadius={8}
    overflow="hidden"
    shadow="0"
    {...props}
  >
    <TouchableNativeFeedback
      onPress={onAdd}
      onLongPress={goToRecipe}
      style={{ height: '100%' }}
    >
      <Image
        h="156px"
        resizeMode="cover"
        source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
        alt={recipe.title || 'карточка рецепта'}
      />
      <Box px={2} py={4} flex={1} justifyContent="space-between">
        <Text
          numberOfLines={2}
          fontSize="sm"
          fontWeight="500"
          children={recipe.title}
        />
        <Text numberOfLines={1} children={`${recipe.kilocalories} ккал`} />
      </Box>
    </TouchableNativeFeedback>
    <FavoriteRecipesButton
      position="absolute"
      right={1}
      top={1}
      defaultIsChecked
      silentUpdate
      recipe={recipe}
    />
  </Box>
);

export default memo(RecipeCard, (prevProps, nextProps) => {
  return prevProps.recipe.id === nextProps.recipe.id;
});
