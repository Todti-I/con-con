import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NumberInput from 'con-con/components/NumberInput';
import { Center, ChevronRightIcon, Text } from 'native-base';
import { useState } from 'react';
import { WizardStackParamList } from '.';
import WizardLayout from './WizardLayout';

const DesiredWeightScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'DesiredWeight'>) => {
  const [desiredWeight, setDesiredWeight] = useState<number | undefined>();

  return (
    <WizardLayout
      title="Укажите вес, который Вы хотите достичь"
      progressValue={5}
      buttonProps={{
        isDisabled: !desiredWeight,
        rightIcon: <ChevronRightIcon />,
        _icon: { ml: 5 },
        children: 'Далее',
        onPress: () => navigation.navigate('ActivityType'),
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
        <Text fontSize="2xl" fontWeight={500} children="Желаемый вес" />
        <NumberInput
          w="45%"
          mt="30px"
          isFloat
          maxLength={5}
          onChange={setDesiredWeight}
          unitName="кг"
        />
      </Center>
    </WizardLayout>
  );
};

DesiredWeightScreen.screenName = 'DesiredWeight' as const;

export default DesiredWeightScreen;
