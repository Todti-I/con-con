import FavoriteRecipesButton from 'con-con/components/FavoriteRecipesButton';
import { RecipeData } from 'con-con/types/recipes';
import isDefined from 'con-con/utils/is-defined';
import { Box, IBoxProps, Image, Text, VStack } from 'native-base';
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
      <VStack px={4} py={3} flex={1} space={0.5} justifyContent="space-between">
        <Text
          flex={1}
          numberOfLines={2}
          fontSize="md"
          fontWeight="500"
          lineHeight="22px"
          children={`${recipe.title[0].toUpperCase()}${recipe.title.slice(1)}`}
        />
        <Text
          numberOfLines={2}
          lineHeight="20px"
          children={
            recipe.ingredients
              .map((i) => i.name)
              .filter(isDefined)
              .join(', ') || `${recipe.cookingTime} минут`
          }
        />
        <Text
          numberOfLines={1}
          lineHeight="20px"
          color="text.400"
          children={`${Math.round(recipe.kilocalories)} ккал`}
        />
      </VStack>
      <Image
        boxSize="128px"
        resizeMode="cover"
        source={{ uri: recipe.cover }}
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
