import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useValue from 'con-con/hooks/useValue';
import { Checkbox, ChevronRightIcon, Divider, Text, VStack } from 'native-base';
import { LogBox } from 'react-native';
import { WizardStackParamList } from './types';
import { useUpdateProgress } from './wizard-context';
import WizardLayout from './WizardLayout';

// https://github.com/GeekyAnts/NativeBase/issues/5098
LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
]);

const PreferencesScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Preferences'>) => {
  useUpdateProgress(7);
  const preferences = useValue<string[]>([]);

  return (
    <WizardLayout
      title="Укажите Ваши предпочтения в кухне"
      buttonProps={{
        rightIcon: <ChevronRightIcon />,
        _icon: { ml: 5 },
        children: 'Далее',
        onPress: () => navigation.navigate('Email'),
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
      <Checkbox.Group px={4} mt={5} onChange={preferences.set}>
        <VStack w="full" space={5}>
          <Checkbox size="md" value="Веган" children="Веган" />
          <Checkbox size="md" value="Вегетарианец" children="Вегетарианец" />
          <Checkbox size="md" value="Пескетарианец" children="Пескетарианец" />
          <Divider />
          <Checkbox size="md" value="Халяль" children="Халяль" />
          <Checkbox size="md" value="Кашрут" children="Кашрут" />
        </VStack>
      </Checkbox.Group>
    </WizardLayout>
  );
};

PreferencesScreen.screenName = 'Preferences' as const;

export default PreferencesScreen;
