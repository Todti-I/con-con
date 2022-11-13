import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'native-base';
import WizardLayout from './WizardLayout';
import { WizardStackParamList } from '.';

const WelcomeScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Welcome'>) => (
  <WizardLayout
    title="Добро пожаловать!"
    buttonProps={{
      children: 'Начать',
      onPress: () => navigation.navigate('Gender'),
    }}
    subButtonProps={{
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

WelcomeScreen.screenName = 'Welcome' as const;

export default WelcomeScreen;