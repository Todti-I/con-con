import Window from 'con-con/components/Window';
import { useAppContext } from 'con-con/hooks';
import FemaleIcon from 'con-con/icons/FemaleIcon';
import MaleIcon from 'con-con/icons/MaleIcon';
import GenderCard from 'con-con/screens/WizardStack/GenderScreen/GenderCard';
import { HStack } from 'native-base';
import { useState } from 'react';
import ProfileDataRow from '../ProfileDataRow';

const GenderRow = () => {
  const { wizardData } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const [gender, setGender] = useState(wizardData.get?.gender);

  const genderLabel =
    wizardData.get?.gender === 'female' ? 'Женский' : 'Мужской';

  const handleSubmit = () => {
    if (wizardData.get && gender) {
      wizardData.set({
        ...wizardData.get,
        gender,
        customKilocalories: undefined,
      });
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setGender(wizardData.get?.gender);
    setIsOpen(false);
  };

  return (
    <>
      <ProfileDataRow
        isFirst
        isHorizontal
        text="Пол"
        subText={genderLabel}
        onPress={() => setIsOpen(true)}
      />
      <Window
        heading="Укажите Ваш пол"
        isOpen={isOpen}
        onClose={handleClose}
        submitProps={{ onPress: handleSubmit }}
      >
        <HStack space={4}>
          <GenderCard
            size="sm"
            isGesture={false}
            isActive={gender === 'male'}
            color="rgba(8, 145, 178, 0.2)"
            activeColor="rgba(8, 145, 178, 0.6)"
            text="Мужской"
            Icon={MaleIcon}
            onPress={() => setGender('male')}
          />
          <GenderCard
            size="sm"
            isGesture={false}
            isActive={gender === 'female'}
            color="rgba(219, 39, 119, 0.2)"
            activeColor="rgba(219, 39, 119, 0.6)"
            text="Женский"
            Icon={FemaleIcon}
            onPress={() => setGender('female')}
          />
        </HStack>
      </Window>
    </>
  );
};

export default GenderRow;
