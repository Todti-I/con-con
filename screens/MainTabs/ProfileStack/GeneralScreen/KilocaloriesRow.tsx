import NumberInput from 'con-con/components/NumberInput';
import Window from 'con-con/components/Window';
import { useAppContext } from 'con-con/hooks';
import { defaultUserData } from 'con-con/types/user';
import calculateUserParams from 'con-con/utils/calculate-user-params';
import { Text } from 'native-base';
import { useEffect, useState } from 'react';
import ProfileDataRow from '../ProfileDataRow';

const KilocaloriesRow = () => {
  const { wizardData, userData, subscriptions } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const [kilocalories, setKilocalories] = useState(
    wizardData.get?.customKilocalories || userData.get.kilocalories
  );

  useEffect(() => {
    const unsubscribe = subscriptions.subscribe('wizard-data', () => {
      setKilocalories(
        wizardData.get?.customKilocalories || userData.get.kilocalories
      );
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = () => {
    if (wizardData.get && kilocalories) {
      wizardData.set({ ...wizardData.get, customKilocalories: kilocalories });
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setKilocalories(
      wizardData.get?.customKilocalories || userData.get.kilocalories
    );
    setIsOpen(false);
  };

  const recommendedUserParams = wizardData.get
    ? calculateUserParams({ ...wizardData.get, customKilocalories: undefined })
    : defaultUserData();

  return (
    <>
      <ProfileDataRow
        text="Скорректировать цель"
        subText={`${userData.get.kilocalories} ккал/день`}
        onPress={() => setIsOpen(true)}
      />
      <Window
        heading="Укажите Вашу цель"
        isOpen={isOpen}
        onClose={handleClose}
        submitProps={{ onPress: handleSubmit }}
      >
        <NumberInput
          px={4}
          py={2}
          maxLength={4}
          variant="outline"
          color="text.900"
          fontSize="lg"
          fontWeight={500}
          textAlign="left"
          unitName="ккал"
          unitProps={{ pr: 4, textTransform: 'lowercase' }}
          defaultValue={kilocalories}
          onChange={setKilocalories}
        />
        <Text
          mt={2}
          mx={1}
          color="text.500"
          children={`Рекомендуемое для Вас количество килокалорий в день - ${recommendedUserParams.kilocalories}`}
        />
      </Window>
    </>
  );
};

export default KilocaloriesRow;
