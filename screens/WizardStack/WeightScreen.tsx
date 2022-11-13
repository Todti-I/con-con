import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NumberInput from 'con-con/components/NumberInput';
import { Center, ChevronRightIcon, Text } from 'native-base';
import { useState } from 'react';
import { WizardStackParamList } from '.';
import WizardLayout from './WizardLayout';

const WeightScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Weight'>) => {
  const [weight, setWeight] = useState<number | undefined>();

  return (
    <WizardLayout
      title="Укажите Ваш вес"
      progressValue={4}
      buttonProps={{
        isDisabled: !weight,
        rightIcon: <ChevronRightIcon />,
        _icon: { ml: 5 },
        children: 'Далее',
        onPress: () => navigation.navigate('DesiredWeight'),
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
        <Text fontSize="2xl" fontWeight={500} children="Текущий вес" />
        <NumberInput
          w="45%"
          mt="30px"
          isFloat
          maxLength={5}
          onChange={setWeight}
          unitName="кг"
        />
      </Center>
    </WizardLayout>
  );
};

WeightScreen.screenName = 'Weight' as const;

export default WeightScreen;