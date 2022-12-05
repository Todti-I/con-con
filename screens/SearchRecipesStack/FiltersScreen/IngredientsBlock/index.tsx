import { useAppContext } from 'con-con/hooks';
import { useMemo } from 'react';
import AddIngredientsButton from './AddIngredientsButton';
import MultipleSelectionBlock from './MultipleSelectionBlock';

type Props = {
  name: string;
  defaultIngredientIds?: string[];
  onChoose?: (id?: string[]) => void;
  goToIngredients: () => void;
};

const IngredientsBlock = ({
  name,
  defaultIngredientIds,
  onChoose,
  goToIngredients,
}: Props) => {
  const { ingredients } = useAppContext();

  const includeIngredientsData = useMemo(() => {
    const ids = new Set(defaultIngredientIds || []);
    return ingredients.get.filter((i) => ids.has(i.id));
  }, [defaultIngredientIds?.join(',')]);

  return (
    <>
      <MultipleSelectionBlock
        defaultIds={defaultIngredientIds}
        name={name}
        filters={includeIngredientsData}
        onChoose={onChoose}
      />
      <AddIngredientsButton children={name} onPress={goToIngredients} />
    </>
  );
};

export default IngredientsBlock;
