import Alert from 'con-con/components/Alert';
import { useAppContext } from 'con-con/hooks';
import { useState } from 'react';
import ProfileDataRow from '../ProfileDataRow';

const UpdateDietRow = () => {
  const { mealsData, isWizardComplete } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    mealsData.set({ ...mealsData.get, date: '' }, true);
    isWizardComplete.set(true);
    setIsOpen(false);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <ProfileDataRow
        isLast
        text="Пересобрать меню на текущий день"
        onPress={() => setIsOpen(true)}
      />
      <Alert
        heading="Пересобрать меню?"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        children="Вам будет предложено новое меню, а существующее будет удалено безвозвратно"
      />
    </>
  );
};

export default UpdateDietRow;
