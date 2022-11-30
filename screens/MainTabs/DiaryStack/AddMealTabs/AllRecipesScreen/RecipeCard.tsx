import FavoriteRecipesButton from 'con-con/components/FavoriteRecipesButton';
import { RecipeData } from 'con-con/types/recipes';
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
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <Box p={4} flex={1} justifyContent="space-between">
        <Text
          numberOfLines={1}
          fontSize="md"
          fontWeight="500"
          children={recipe.title}
        />
        <Text
          numberOfLines={2}
          children={recipe.ingridients.map((i) => i.value).join(', ')}
        />
        <Text numberOfLines={1} children={`${recipe.kilocalories} ккал`} />
      </Box>
      <Image
        boxSize="128px"
        resizeMode="cover"
        source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
        alt={recipe.title || 'карточка рецепта'}
      />
    </TouchableNativeFeedback>
    <FavoriteRecipesButton
      position="absolute"
      top={0}
      right={0}
      recipe={recipe}
    />
  </Box>
);

export default memo(RecipeCard, (prevProps, nextProps) => {
  return prevProps.recipe.id === nextProps.recipe.id;
});
