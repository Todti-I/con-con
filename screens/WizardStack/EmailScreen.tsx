import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useAppContext from 'con-con/hooks/useAppContext';
import { Input, Text } from 'native-base';
import { useState } from 'react';
import { WizardStackParamList } from './types';
import { useDataUpdates, useProgressUpdates } from './wizard-context';
import WizardLayout from './WizardLayout';

const EmailScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Email'>) => {
  const { isWizardComplete, forceUpdate } = useAppContext();
  const { data, useUpdate } = useDataUpdates();
  const [email, setEmail] = useState(data.get.email || '');

  useProgressUpdates(8);
  useUpdate({ email }, [email]);

  const handleComplete = () => {
    console.log(data.get);

    isWizardComplete.set(true);
    forceUpdate();
  };

  return (
    <WizardLayout
      title="Введите Вашу электронную почту"
      buttonProps={{
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
