import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useAppContext } from 'con-con/hooks';
import { useState } from 'react';
import ProfileDataRow from '../ProfileDataRow';

const AgeRow = () => {
  const { wizardData } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const [birthday, setBirthday] = useState(
    wizardData.get?.birthday ? new Date(wizardData.get.birthday) : undefined
  );

  const age = Math.abs(
    new Date(
      Date.now() - new Date(wizardData.get?.birthday || Date.now()).getTime()
    ).getUTCFullYear() - 1970
  ).toString();

  const handleChange = (event: DateTimePickerEvent, newDate?: Date) => {
    if (event.type === 'set' && wizardData.get && newDate) {
      wizardData.set({ ...wizardData.get, birthday: newDate });
      setBirthday(newDate);
    }

    setIsOpen(false);
  };

  return (
    <>
      <ProfileDataRow
        isHorizontal
        text="Возраст"
        subText={age}
        onPress={() => setIsOpen(true)}
      />
      {isOpen && (
        <RNDateTimePicker
          mode="date"
          value={birthday || new Date()}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default AgeRow;
