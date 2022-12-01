import FavoriteRecipesButton from 'con-con/components/FavoriteRecipesButton';
import { MealType, RecipeData } from 'con-con/types/recipes';
import { Box, IBoxProps, Image, Text } from 'native-base';
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
        style={{ height: '100%' }}
      >
        <Image
          h="156px"
          resizeMode="cover"
          source={{ uri: recipe.cover }}
          alt={recipe.title || 'карточка рецепта'}
        />
        <Box px={2} py={4} flex={1} justifyContent="space-between">
          <Text
            numberOfLines={2}
            fontSize="sm"
            fontWeight="500"
            children={recipe.title}
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
        defaultIsChecked
        silentUpdate
        recipe={recipe}
      />
      <AddMealWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mealType={mealType}
        onSubmit={onAdd}
      />
    </Box>
  );
};

export default memo(RecipeCard, (prevProps, nextProps) => {
  return prevProps.recipe.id === nextProps.recipe.id;
});
