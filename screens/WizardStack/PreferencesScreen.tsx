import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from 'con-con/hooks';
import { WizardStackParamList } from 'con-con/types/navigation';
import { WizardData } from 'con-con/types/wizard-data';
import { Checkbox, Divider, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import {
  useDataUpdates,
  useProgressUpdates,
  useWizardContext,
} from './wizard-context';
import WizardLayout from './WizardLayout';

// https://github.com/GeekyAnts/NativeBase/issues/5098
LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
]);

const PreferencesScreen = ({
  navigation,
}: NativeStackScreenProps<WizardStackParamList, 'Preferences'>) => {
  useProgressUpdates(6);
  const { wizardData, subscriptions } = useAppContext();
  const { data, onComplete } = useWizardContext();
  const { update } = useDataUpdates();

  const [isLoading, setIsLoading] = useState(false);

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
      title="Укажите Ваши предпочтения в кухне"
      buttonProps={{
        isLoading,
        onPress: handleComplete,
        children: 'Зарегистрироваться',
      }}
      subButtonProps={{
        onPress: () => navigation.goBack(),
        children: 'Вернуться назад',
      }}
    >
      <Text fontWeight={500}>
        Выберите системы питания, блюда которых будут предлагаться Вам в
        рекомендациях.{'\n'}Больше диет и кухонь появятся в будущем
      </Text>
      <Checkbox.Group
        px={4}
        mt={5}
        defaultValue={data.get.preferences}
        onChange={(preferences) => update({ preferences })}
      >
        <VStack w="full" space={5}>
          <Checkbox size="md" value="vegetarian" children="Вегетарианец" />
          <Divider />
          <Checkbox
            isDisabled
            size="md"
            value="soon"
            children="Веган"
            _text={{ color: 'text.500' }}
          />
          <Checkbox
            isDisabled
            size="md"
            value="soon"
            children="Пескетарианец"
            _text={{ color: 'text.500' }}
          />
          <Checkbox
            isDisabled
            size="md"
            value="soon"
            children="Халяль"
            _text={{ color: 'text.500' }}
          />
          <Checkbox
            isDisabled
            size="md"
            value="soon"
            children="Кашрут"
            _text={{ color: 'text.500' }}
          />
        </VStack>
      </Checkbox.Group>
    </WizardLayout>
  );
};

PreferencesScreen.screenName = 'Preferences' as const;

export default PreferencesScreen;
