import { useAppContext } from 'con-con/hooks';
import OutlineHeartIcon from 'con-con/icons/OutlineHeartIcon';
import SolidHeartIcon from 'con-con/icons/SolidHeartIcon';
import { RecipeData } from 'con-con/types/recipes';
import { IconButton, IIconButtonProps, IIconProps } from 'native-base';
import { memo, useEffect, useMemo, useState } from 'react';

type Props = {
  defaultIsChecked?: boolean;
  recipe: RecipeData;
  activeProps?: IIconButtonProps;
  activeIconColor?: string;
  iconProps?: IIconProps;
} & IIconButtonProps;

const FavoriteRecipesButton = ({
  defaultIsChecked,
  recipe,
  iconProps,
  ...props
}: Props) => {
  const { favoriteRecipes, subscriptions } = useAppContext();

  const [isChecked, setIsChecked] = useState(() => {
    return (
      defaultIsChecked ||
      Boolean(favoriteRecipes.get.find((r) => r.id === recipe?.id)) ||
      false
    );
  });

  useEffect(() => {
    const unsubscribe = subscriptions.subscribe('favorite-recipes', () =>
      setIsChecked(
        Boolean(favoriteRecipes.get.find((r) => r.id === recipe?.id)) || false
      )
    );

    return () => unsubscribe();
  }, []);

  return useMemo(() => {
    const Icon = isChecked ? SolidHeartIcon : OutlineHeartIcon;

    const handleFavorite = () => {
      const newRecipes = favoriteRecipes.get.filter((r) => r.id !== recipe.id);
      if (!isChecked) {
        favoriteRecipes.set([...newRecipes, recipe]);
      } else {
        favoriteRecipes.set(newRecipes);
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
  }, [isChecked]);
};

export default memo(FavoriteRecipesButton, () => true);
