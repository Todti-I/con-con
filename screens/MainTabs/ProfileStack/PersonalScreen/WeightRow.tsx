import NumberInput from 'con-con/components/NumberInput';
import Window from 'con-con/components/Window';
import { useAppContext } from 'con-con/hooks';
import { useState } from 'react';
import ProfileDataRow from '../ProfileDataRow';

const WeightRow = () => {
  const { wizardData } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const [weight, setWeight] = useState(wizardData.get?.weight);

  const weightLabel = (wizardData.get?.weight || 0).toString();

  const handleSubmit = () => {
    if (wizardData.get && weight) {
      wizardData.set({ ...wizardData.get, weight });
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setWeight(wizardData.get?.weight);
    setIsOpen(false);
  };

  return (
    <>
      <ProfileDataRow
        isHorizontal
        text="Вес"
        subText={weightLabel}
        onPress={() => setIsOpen(true)}
      />
      <Window
        heading="Укажите Ваш вес"
        isOpen={isOpen}
        onClose={handleClose}
        submitProps={{ onPress: handleSubmit }}
      >
        <NumberInput
          isFloat
          maxLength={5}
          onChange={setWeight}
          unitName="кг"
          defaultValue={weight}
        />
      </Window>
    </>
  );
};

export default WeightRow;
