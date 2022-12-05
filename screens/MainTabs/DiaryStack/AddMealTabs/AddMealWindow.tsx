import Input from 'con-con/components/Input';
import NumberInput from 'con-con/components/NumberInput';
import Window, { WindowProps } from 'con-con/components/Window';
import { useAppContext } from 'con-con/hooks';
import { MealType, RecipeData } from 'con-con/types/recipes';
import { Text } from 'native-base';
import { useState } from 'react';
import mealTypeData from '../meal-type-data';

type Props = {
  mealType: MealType;
  recipe: RecipeData;
  onSubmit?: (mass: number) => void;
};

const AddMealWindow = ({
  isOpen,
  onClose,
  mealType,
  recipe,
  onSubmit,
}: WindowProps<Props>) => {
  const { userData } = useAppContext();
  const recommendedMass = Math.round(
    ((userData.get.kilocalories * mealTypeData[mealType].mealCoefficient) /
      recipe.kilocalories) *
      100
  );

  const [mass, setMass] = useState(recommendedMass);

  const handleSubmit = () => {
    onClose();
    onSubmit?.(mass);
  };

  return (
    <Window
      isOpen={isOpen}
      onClose={onClose}
      heading="Добавить в дневник"
      submitProps={{
        isDisabled: mass <= 0,
        onPress: handleSubmit,
        children: 'Добавить',
      }}
    >
      <NumberInput
        px={4}
        py={2}
        label="Масса порции"
        variant="outline"
        color="text.900"
        fontSize="md"
        fontWeight={500}
        textAlign="left"
        unitName="грамм"
        unitProps={{ pr: 4, textTransform: 'lowercase' }}
        defaultValue={recommendedMass}
        onChange={setMass}
      />
      <Text
        mt={1}
        mx={1}
        color="text.500"
        children={`Рекомендуемая масса ${recommendedMass}г`}
      />
      <Input
        px={4}
        py={2}
        fontWeight={500}
        fontSize="md"
        label="Тип приема пищи"
        isDisabled={Boolean(mealType)}
        formControlProps={{ mt: 3 }}
        value={mealTypeData[mealType].name}
      />
    </Window>
  );
};
export default AddMealWindow;
