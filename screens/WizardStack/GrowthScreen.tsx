import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NumberInput from 'con-con/components/NumberInput';
import { Center, ChevronRightIcon, Text } from 'native-base';
import { useState } from 'react';
import { WizardStackParamList } from './types';
import { useUpdateProgress } from './wizard-context';
import WizardLayout from './WizardLayout';

const GrowthScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Growth'>) => {
  useUpdateProgress(3);
  const [growth, setGrowth] = useState<number | undefined>();

  return (
    <WizardLayout
      title="Укажите Ваш рост"
      buttonProps={{
        isDisabled: !growth,
        rightIcon: <ChevronRightIcon />,
        _icon: { ml: 5 },
        children: 'Далее',
        onPress: () => navigation.navigate('Weight'),
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
        <Text fontSize="2xl" fontWeight={500} children="Рост" />
        <NumberInput
          w="35%"
          mt="30px"
          maxLength={3}
          onChange={setGrowth}
          unitName="см"
        />
      </Center>
    </WizardLayout>
  );
};

GrowthScreen.screenName = 'Growth' as const;

export default GrowthScreen;
