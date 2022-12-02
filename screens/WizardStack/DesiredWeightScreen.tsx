import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NumberInput from 'con-con/components/NumberInput';
import { WizardStackParamList } from 'con-con/types/navigation';
import { Center, ChevronRightIcon, Text } from 'native-base';
import { useState } from 'react';
import { useDataUpdates, useProgressUpdates } from './wizard-context';
import WizardLayout from './WizardLayout';

const DesiredWeightScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'DesiredWeight'>) => {
  useProgressUpdates(5);
  const { data, useUpdate } = useDataUpdates();
  const [desiredWeight, setDesiredWeight] = useState(data.desiredWeight);

  useUpdate({ desiredWeight }, [desiredWeight]);

  return (
    <WizardLayout
      title="Укажите вес, который Вы хотите достичь"
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
          isFloat
          maxLength={5}
          onChange={setDesiredWeight}
          unitName="кг"
          defaultValue={desiredWeight}
          formControlProps={{ mt: '30px', w: '45%' }}
        />
      </Center>
    </WizardLayout>
  );
};

DesiredWeightScreen.screenName = 'DesiredWeight' as const;

export default DesiredWeightScreen;
