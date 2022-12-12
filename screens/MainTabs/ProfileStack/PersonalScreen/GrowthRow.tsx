import NumberInput from 'con-con/components/NumberInput';
import Window from 'con-con/components/Window';
import { useAppContext } from 'con-con/hooks';
import { useState } from 'react';
import ProfileDataRow from '../ProfileDataRow';

const GrowthRow = () => {
  const { wizardData } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const [growth, setGrowth] = useState(wizardData.get?.growth);

  const growthLabel = (wizardData.get?.growth || 0).toString();

  const handleSubmit = () => {
    if (wizardData.get && growth) {
      wizardData.set({ ...wizardData.get, growth });
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setGrowth(wizardData.get?.growth);
    setIsOpen(false);
  };

  return (
    <>
      <ProfileDataRow
        isHorizontal
        text="Рост"
        subText={growthLabel}
        onPress={() => setIsOpen(true)}
      />
      <Window
        heading="Укажите Ваш рост"
        isOpen={isOpen}
        onClose={handleClose}
        submitProps={{ onPress: handleSubmit }}
      >
        <NumberInput
          maxLength={3}
          onChange={setGrowth}
          unitName="см"
          defaultValue={growth}
        />
      </Window>
    </>
  );
};

export default GrowthRow;
