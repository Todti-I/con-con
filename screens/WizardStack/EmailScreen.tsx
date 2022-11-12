import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input, Text } from 'native-base';
import { useState } from 'react';
import { WizardStackParamList } from '.';
import WizardLayout from './WizardLayout';

const EmailScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Email'>) => {
  const [email, setEmail] = useState('');

  return (
    <WizardLayout
      title="Введите Вашу электронную почту"
      progressValue={8}
      buttonProps={{
        isDisabled: !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email),
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
        onChangeText={setEmail}
        fontWeight={500}
      />
    </WizardLayout>
  );
};

EmailScreen.screenName = 'Email' as const;

export default EmailScreen;
