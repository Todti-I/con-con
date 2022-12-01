import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HighActivityIcon from 'con-con/icons/HighActivityIcon';
import LowActivityIcon from 'con-con/icons/LowActivityIcon';
import MediumActivityIcon from 'con-con/icons/MediumActivityIcon';
import { ActivityType } from 'con-con/types/wizard-data';
import { ChevronRightIcon, Text, VStack } from 'native-base';
import { useState } from 'react';
import { WizardStackParamList } from '../types';
import { useDataUpdates, useProgressUpdates } from '../wizard-context';
import WizardLayout from '../WizardLayout';
import ActivityButton from './ActivityButton';

const activityTypes = [
  {
    id: 'low' as const,
    name: 'Низкая',
    Icon: LowActivityIcon,
    colorScheme: 'pink',
  },
  {
    id: 'medium' as const,
    name: 'Средняя',
    Icon: MediumActivityIcon,
    colorScheme: 'cyan',
  },
  {
    id: 'high' as const,
    name: 'Высокая',
    Icon: HighActivityIcon,
    colorScheme: 'tertiary',
  },
];

const ActivityTypeScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'ActivityType'>) => {
  useProgressUpdates(6);
  const { data, update } = useDataUpdates();
  const [chosenActivityType, setChosenActivityType] = useState(
    data.activityType
  );

  const handleChange = (activityType: ActivityType) => () => {
    update({ activityType });
    setChosenActivityType(activityType);
  };

  return (
    <WizardLayout
      title="Укажите вашу активность"
      buttonProps={{
        rightIcon: <ChevronRightIcon />,
        _icon: { ml: 5 },
        children: 'Далее',
        isDisabled: !chosenActivityType,
        onPress: () => navigation.navigate('Preferences'),
      }}
      subButtonProps={{
        onPress: () => navigation.goBack(),
        children: 'Вернуться назад',
      }}
    >
      <Text fontWeight={500}>
        Пожалуйста, ответьте на вопросы, чтобы персонализировать ваш план
        питания и вычислить потребность в калориях.
      </Text>
      <VStack mt="50px" space={8}>
        {activityTypes.map((type) => (
          <ActivityButton
            key={type.id}
            Icon={type.Icon}
            isActive={chosenActivityType === type.id}
            colorScheme={type.colorScheme}
            onPress={handleChange(type.id)}
            children={type.name}
          />
        ))}
      </VStack>
    </WizardLayout>
  );
};

ActivityTypeScreen.screenName = 'ActivityType' as const;

export default ActivityTypeScreen;
