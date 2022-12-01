import Input from 'con-con/components/Input';
import NumberInput from 'con-con/components/NumberInput';
import Window, { WindowProps } from 'con-con/components/Window';
import { MealType } from 'con-con/types/recipes';
import { useState } from 'react';
import mealTypeData from '../meal-type-data';

type Props = {
  mealType: MealType;
  onSubmit?: (mass: number) => void;
};

const AddMealWindow = ({
  isOpen,
  onClose,
  mealType,
  onSubmit,
}: WindowProps<Props>) => {
  const [mass, setMass] = useState(0);

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
        label="Масс порции"
        variant="outline"
        color="text.900"
        fontSize="md"
        fontWeight={500}
        textAlign="left"
        unitName="грамм"
        unitProps={{ pr: 4, textTransform: 'lowercase' }}
        onChange={setMass}
      />
      <Input
        px={4}
        py={2}
        fontWeight={500}
        fontSize="md"
        label="Тип приема пищи"
        isDisabled={Boolean(mealType)}
        formControlProps={{ mt: 4 }}
        value={mealTypeData[mealType].name}
      />
    </Window>
  );
};
export default AddMealWindow;
