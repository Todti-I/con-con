import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'native-base';
import { WizardStackParamList } from './types';
import { useProgressUpdates, useWizardContext } from './wizard-context';
import WizardLayout from './WizardLayout';

const WelcomeScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Welcome'>) => {
  useProgressUpdates(0);
  const { onComplete } = useWizardContext();

  return (
    <WizardLayout
      title="Добро пожаловать!"
      buttonProps={{
        children: 'Начать',
        onPress: () => navigation.navigate('Gender'),
      }}
      subButtonProps={{
        onPress: onComplete,
        children: 'Уже зарегистрированы? Войти',
      }}
    >
      <Text
        fontSize="xl"
        fontWeight={500}
        children="Давайте определим вашу индивидуальную диету!"
      />
    </WizardLayout>
  );
};

WelcomeScreen.screenName = 'Welcome' as const;

export default WelcomeScreen;
