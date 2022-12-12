import Window from 'con-con/components/Window';
import { useAppContext } from 'con-con/hooks';
import { Checkbox, Divider, VStack } from 'native-base';
import { useState } from 'react';
import ProfileDataRow from '../ProfileDataRow';

const PreferencesRow = () => {
  const { wizardData } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const [preferences, setPreferences] = useState(wizardData.get?.preferences);

  const handleSubmit = () => {
    if (wizardData.get) {
      wizardData.set({
        ...wizardData.get,
        preferences: preferences || [],
      });
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setPreferences(wizardData.get?.preferences);
    setIsOpen(false);
  };

  return (
    <>
      <ProfileDataRow
        text="Особенности рациона и предпочтения в еде"
        onPress={() => setIsOpen(true)}
      />
      <Window
        heading="Укажите Ваши предпочтения"
        isOpen={isOpen}
        onClose={handleClose}
        submitProps={{ onPress: handleSubmit }}
      >
        <Checkbox.Group defaultValue={preferences} onChange={setPreferences}>
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
      </Window>
    </>
  );
};

export default PreferencesRow;
