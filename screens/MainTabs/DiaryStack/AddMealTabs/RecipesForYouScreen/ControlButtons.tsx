import FavoriteRecipesButton from 'con-con/components/FavoriteRecipesButton';
import ThumbUpIcon from 'con-con/icons/ThumbUpIcon';
import { RecipeData } from 'con-con/types/recipes';
import { AddIcon, HStack, IconButton } from 'native-base';

type Props = {
  recipe: RecipeData;
  onAdd?: () => void;
  onNext?: () => void;
};

const ControlButtons = ({ recipe, onAdd, onNext }: Props) => (
  <HStack mt={4} space={5} justifyContent="center" alignItems="center">
    <IconButton
      shadow="0"
      bg="text.50"
      boxSize="60px"
      variant="solid"
      borderRadius="full"
      _pressed={{ bg: 'text.200' }}
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
      onPress={onAdd}
      icon={<AddIcon size="45px" />}
    />
    <FavoriteRecipesButton
      key={recipe.id}
      recipe={recipe}
      shadow="0"
      boxSize="60px"
      variant="solid"
      borderRadius="full"
      colorScheme="fuchsia"
      bg="text.50"
      _pressed={{ bg: 'text.200' }}
      iconProps={{ size: '28px', color: 'fuchsia.500' }}
    />
  </HStack>
);

export default ControlButtons;
