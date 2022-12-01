import FavoriteRecipesButton from 'con-con/components/FavoriteRecipesButton';
import ThumbUpIcon from 'con-con/icons/ThumbUpIcon';
import { MealType, RecipeData } from 'con-con/types/recipes';
import { AddIcon, HStack, IconButton } from 'native-base';
import { useState } from 'react';
import AddMealWindow from '../AddMealWindow';

type Props = {
  isDisabled?: boolean;
  recipe: RecipeData;
  mealType: MealType;
  onAdd?: (mass: number) => void;
  onNext?: () => void;
};

const ControlButtons = ({
  isDisabled,
  recipe,
  mealType,
  onAdd,
  onNext,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HStack mt={4} space={5} justifyContent="center" alignItems="center">
      <IconButton
        shadow="0"
        bg="text.50"
        boxSize="60px"
        variant="solid"
        borderRadius="full"
        _pressed={{ bg: 'text.200' }}
        isDisabled={isDisabled}
        onPress={onNext}
        icon={
          <ThumbUpIcon
            size="28px"
            color="red.500"
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        }
      />
      <IconButton
        shadow="0"
        boxSize="80px"
        variant="solid"
        borderRadius="full"
        colorScheme="violet"
        // onPress={onAdd}
        onPress={() => setIsOpen(true)}
        isDisabled={isDisabled}
        icon={<AddIcon size="45px" />}
      />
      <FavoriteRecipesButton
        key={recipe?.id}
        recipe={recipe}
        shadow="0"
        boxSize="60px"
        variant="solid"
        borderRadius="full"
        colorScheme="fuchsia"
        bg="text.50"
        isDisabled={isDisabled}
        _pressed={{ bg: 'text.200' }}
        iconProps={{ size: '28px', color: 'fuchsia.500' }}
      />
      <AddMealWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mealType={mealType}
        onSubmit={onAdd}
      />
    </HStack>
  );
};

export default ControlButtons;
