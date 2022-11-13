import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRightIcon, HStack, Text } from 'native-base';
import { useState } from 'react';
import { WizardStackParamList } from '../types';
import { useDataUpdates, useProgressUpdates } from '../wizard-context';
import WizardLayout from '../WizardLayout';
import GenderCard from './GenderCard';

const GenderScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Gender'>) => {
  useProgressUpdates(1);
  const { data, useUpdate } = useDataUpdates();
  const [gender, setGender] = useState(data.gender);

  useUpdate({ gender }, [gender]);

  return (
    <WizardLayout
      title="Укажите Ваш пол"
      buttonProps={{
        isDisabled: !gender,
        rightIcon: <ChevronRightIcon />,
        _icon: { ml: 5 },
        children: 'Далее',
        onPress: () => navigation.navigate('Birthday'),
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
      <HStack mt="50px" space={4}>
        <GenderCard
          isActive={gender === 'male'}
          color="rgba(8, 145, 178, 0.2)"
          activeColor="rgba(8, 145, 178, 0.6)"
          text="Мужской"
          image={require('con-con/assets/images/male.png')}
          onPress={() => setGender('male')}
        />
        <GenderCard
          isActive={gender === 'female'}
          color="rgba(219, 39, 119, 0.2)"
          activeColor="rgba(219, 39, 119, 0.6)"
          text="Женский"
          image={require('con-con/assets/images/female.png')}
          onPress={() => setGender('female')}
        />
      </HStack>
    </WizardLayout>
  );
};

GenderScreen.screenName = 'Gender' as const;

export default GenderScreen;
