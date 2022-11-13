import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRightIcon, Text } from 'native-base';
import { WizardStackParamList } from './types';
import { useProgressUpdates } from './wizard-context';
import WizardLayout from './WizardLayout';

const ActivityTypeScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'ActivityType'>) => {
  useProgressUpdates(6);

  return (
    <WizardLayout
      title="Укажите вашу активность"
      buttonProps={{
        rightIcon: <ChevronRightIcon />,
        _icon: { ml: 5 },
        children: 'Далее',
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
      {/* TODO макет некорректный, так что надо уточнить что тут должно быть */}
    </WizardLayout>
  );
};

ActivityTypeScreen.screenName = 'ActivityType' as const;

export default ActivityTypeScreen;
