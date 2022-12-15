import Window from 'con-con/components/Window';
import { useAppContext } from 'con-con/hooks';
import { activityTypes } from 'con-con/screens/WizardStack/ActivityTypeScreen';
import ActivityButton from 'con-con/screens/WizardStack/ActivityTypeScreen/ActivityButton';
import { VStack } from 'native-base';
import { useState } from 'react';
import ProfileDataRow from '../ProfileDataRow';

const ActivityTypeRow = () => {
  const { wizardData } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const [activityType, setActivityType] = useState(
    wizardData.get?.activityType
  );

  const activityTypeLabel =
    activityTypes.find((a) => a.id === wizardData.get?.activityType)?.name ||
    'Низкая';

  const handleSubmit = () => {
    if (wizardData.get && activityType) {
      wizardData.set({
        ...wizardData.get,
        activityType,
        customKilocalories: undefined,
      });
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setActivityType(wizardData.get?.activityType);
    setIsOpen(false);
  };

  return (
    <>
      <ProfileDataRow
        isLast
        isHorizontal
        text="Уровень активности"
        subText={activityTypeLabel}
        onPress={() => setIsOpen(true)}
      />
      <Window
        heading="Укажите уровень активности"
        isOpen={isOpen}
        onClose={handleClose}
        submitProps={{ onPress: handleSubmit }}
      >
        <VStack space={4}>
          {activityTypes.map((type) => (
            <ActivityButton
              key={type.id}
              Icon={type.Icon}
              isActive={activityType === type.id}
              colorScheme={type.colorScheme}
              onPress={() => setActivityType(type.id)}
              children={type.name}
            />
          ))}
        </VStack>
      </Window>
    </>
  );
};

export default ActivityTypeRow;
