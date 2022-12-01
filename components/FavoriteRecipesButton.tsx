import { useAppContext } from 'con-con/hooks';
import OutlineHeartIcon from 'con-con/icons/OutlineHeartIcon';
import SolidHeartIcon from 'con-con/icons/SolidHeartIcon';
import { RecipeData } from 'con-con/types/recipes';
import { IconButton, IIconButtonProps, IIconProps } from 'native-base';
import { memo, useState } from 'react';

type Props = {
  defaultIsChecked?: boolean;
  recipe: RecipeData;
  silentUpdate?: boolean;
  activeProps?: IIconButtonProps;
  activeIconColor?: string;
  iconProps?: IIconProps;
} & IIconButtonProps;

const FavoriteRecipesButton = ({
  defaultIsChecked,
  recipe,
  silentUpdate,
  iconProps,
  ...props
}: Props) => {
  const { favoriteRecipes } = useAppContext();

  const [isChecked, setIsChecked] = useState(() => {
    return (
      defaultIsChecked ||
      Boolean(favoriteRecipes.get.find((r) => r.id === recipe?.id)) ||
      false
    );
  });

  const Icon = isChecked ? SolidHeartIcon : OutlineHeartIcon;

  const handleFavorite = () => {
    const newRecipes = favoriteRecipes.get.filter((r) => r.id !== recipe.id);
    if (!isChecked) {
      favoriteRecipes.set([...newRecipes, recipe], silentUpdate);
    } else {
      favoriteRecipes.set(newRecipes, silentUpdate);
    }
    setIsChecked(!isChecked);
  };

  return (
    <IconButton
      colorScheme="red"
      borderRadius="full"
      {...props}
      icon={<Icon {...iconProps} />}
      onPress={handleFavorite}
    />
  );
};

export default memo(FavoriteRecipesButton, () => true);
