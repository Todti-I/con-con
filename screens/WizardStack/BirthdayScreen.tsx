import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DatePicker from 'con-con/components/DatePicker';
import { Center, ChevronRightIcon, Text } from 'native-base';
import { useState } from 'react';
import { WizardStackParamList } from '.';
import WizardLayout from './WizardLayout';

const BirthdayScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Birthday'>) => {
  const [birthday, setBirthday] = useState<Date | undefined>();

  return (
    <WizardLayout
      title="Укажите Вашу дату рождения"
      progressValue={2}
      buttonProps={{
        isDisabled: birthday === undefined,
        rightIcon: <ChevronRightIcon />,
        _icon: { ml: 5 },
        children: 'Далее',
        onPress: () => navigation.navigate('Growth'),
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
      <Center mt="50px">
        <Text fontSize="2xl" fontWeight={500} children="Дата рождения" />
        <DatePicker
          w="70%"
          mt="30px"
          defaultDate={birthday}
          onChange={setBirthday}
        />
      </Center>
    </WizardLayout>
  );
};

BirthdayScreen.screenName = 'Birthday' as const;

export default BirthdayScreen;
