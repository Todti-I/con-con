import { useAppContext } from 'con-con/hooks';
import BasketProductData from 'con-con/types/basket-product-data';
import { RecipeData } from 'con-con/types/recipes';
import { AddIcon, Button, CheckIcon, IButtonProps } from 'native-base';
import { useState } from 'react';
import uuid from 'react-native-uuid';

type Ingredient = RecipeData['ingredients'][0];

type Props = {
  ingredients: Ingredient[];
} & IButtonProps;

const AddIngredientsToBucketButton = ({ ingredients, ...props }: Props) => {
  const { basketProducts } = useAppContext();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (isAdded) return;
    const newProducts = [
      ...basketProducts.get,
      ...ingredients.map<BasketProductData>((i) => ({
        id: uuid.v4().toString(),
        name: i.name || i.id,
        grams: i.mass,
        isChecked: false,
      })),
    ];
    basketProducts.set(newProducts);
    setIsAdded(true);
  };

  return (
    <Button
      borderRadius={8}
      variant="outline"
      _text={{ fontWeight: 500 }}
      onPress={handleAdd}
      borderColor={isAdded ? 'success.600' : 'primary.600'}
      colorScheme={isAdded ? 'success' : 'primary'}
      leftIcon={isAdded ? <CheckIcon mr={4} /> : <AddIcon mr={4} />}
      children={isAdded ? 'Добавлено в список' : 'Добавить в список'}
      {...props}
    />
  );
};

export default AddIngredientsToBucketButton;
