import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from 'con-con/hooks';
import { WizardData } from 'con-con/types/wizard-data';
import { Input, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { WizardStackParamList } from './types';
import {
  useDataUpdates,
  useProgressUpdates,
  useWizardContext,
} from './wizard-context';
import WizardLayout from './WizardLayout';

const EmailScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Email'>) => {
  const { wizardData, subscriptions } = useAppContext();
  const { data, onComplete } = useWizardContext();
  const { useUpdate } = useDataUpdates();
  const [email, setEmail] = useState(data.get.email || '');
  const [isLoading, setIsLoading] = useState(false);

  useProgressUpdates(8);
  useUpdate({ email }, [email]);

  useEffect(() => {
    const unsubscribe = subscriptions.subscribe('wizard-data', onComplete);

    return () => unsubscribe();
  }, []);

  const handleComplete = async () => {
    setIsLoading(true);
    wizardData.set(data.get as WizardData);
  };

  return (
    <WizardLayout
      title="Введите Вашу электронную почту"
      buttonProps={{
        isLoading,
        isDisabled: !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email),
        onPress: handleComplete,
        children: 'Зарегистрироваться',
      }}
      subButtonProps={{
        onPress: () => navigation.goBack(),
        children: 'Вернуться назад',
      }}
    >
      <Text fontWeight={500}>
        Добавьте свою электронную почту, чтобы не потерять прогресс.
      </Text>
      <Input
        mx={4}
        mt={10}
        autoComplete="email"
        keyboardType="email-address"
        placeholder="E-mail"
        variant="underlined"
        fontSize="2xl"
        fontWeight={500}
        onChangeText={setEmail}
        defaultValue={email}
      />
    </WizardLayout>
  );
};

EmailScreen.screenName = 'Email' as const;

export default EmailScreen;
