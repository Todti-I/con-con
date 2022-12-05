import ImageFallback from 'con-con/api/ImageFallback';
import FavoriteRecipesButton from 'con-con/components/FavoriteRecipesButton';
import { MealType, RecipeData } from 'con-con/types/recipes';
import isDefined from 'con-con/utils/is-defined';
import { Box, IBoxProps, Image, Text, VStack } from 'native-base';
import { memo, useState } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import AddMealWindow from '../AddMealWindow';

type Props = {
  mealType: MealType;
  recipe: RecipeData;
  onAdd?: (mass: number) => void;
  goToRecipe?: () => void;
} & IBoxProps;

const RecipeCard = ({
  mealType,
  recipe,
  onAdd,
  goToRecipe,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      position="relative"
      bg="white"
      borderRadius={8}
      overflow="hidden"
      shadow="0"
      {...props}
    >
      <TouchableNativeFeedback
        onPress={() => setIsOpen(true)}
        onLongPress={goToRecipe}
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <VStack
          px={4}
          py={3}
          flex={1}
          space={0.5}
          justifyContent="space-between"
        >
          <Text
            flex={1}
            numberOfLines={2}
            fontSize="md"
            fontWeight="500"
            lineHeight="22px"
            children={`${recipe.title[0].toUpperCase()}${recipe.title.slice(
              1
            )}`}
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
          fallbackElement={<ImageFallback />}
          alt={recipe.title || 'карточка рецепта'}
        />
      </TouchableNativeFeedback>
      <FavoriteRecipesButton
        position="absolute"
        top={0}
        right={0}
        recipe={recipe}
      />
      <AddMealWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mealType={mealType}
        recipe={recipe}
        onSubmit={onAdd}
      />
    </Box>
  );
};

export default memo(RecipeCard, (prevProps, nextProps) => {
  return prevProps.recipe.id === nextProps.recipe.id;
});
