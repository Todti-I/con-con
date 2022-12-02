import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from 'con-con/hooks';
import { WizardStackParamList } from 'con-con/types/navigation';
import { Text } from 'native-base';
import { useProgressUpdates, useWizardContext } from './wizard-context';
import WizardLayout from './WizardLayout';

const WelcomeScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Welcome'>) => {
  useProgressUpdates(0);
  const { wizardData } = useAppContext();
  const { onComplete } = useWizardContext();

  return (
    <WizardLayout
      withLogo
      title="Добро пожаловать!"
      buttonProps={{
        children: 'Начать',
        onPress: () => navigation.navigate('Gender'),
      }}
      subButtonProps={{
        opacity: wizardData.get ? 1 : 0,
        pointerEvents: wizardData.get ? undefined : 'none',
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
