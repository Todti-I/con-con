import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import useValue from 'con-con/hooks/useValue';
import EmptyCalendar from 'con-con/icons/EmptyCalendarIcon';
import { IInputProps, Input } from 'native-base';
import { useRef, useState } from 'react';

type Props = {
  defaultDate?: Date;
  onChange?: (date?: Date) => void;
} & Omit<IInputProps, 'onChange'>;

const formatDate = (date?: Date): string => {
  if (!date) return '';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

const DatePicker = ({ defaultDate, onChange, ...props }: Props) => {
  const input = useRef<HTMLInputElement>(null);
  const date = useValue(defaultDate);
  const [isShow, setIsShow] = useState(false);

  const showDatePicker = () => setIsShow(true);

  const handleChange = (event: DateTimePickerEvent, newDate?: Date) => {
    event.type === 'set' && date.set(newDate);
    input.current?.blur();
    setIsShow(false);
    event.type === 'set' && onChange?.(newDate);
  };

  return (
    <>
      <Input
        ref={input}
        caretHidden
        showSoftInputOnFocus={false}
        variant="underlined"
        color="text.900"
        fontSize="4xl"
        fontWeight={500}
        textAlign="center"
        value={formatDate(date.get)}
        onPressOut={showDatePicker}
        rightElement={
          <EmptyCalendar pointerEvents="none" size={8} color="dark.50" />
        }
        {...props}
      />
      {isShow && (
        <RNDateTimePicker
          mode="date"
          value={date.get || new Date()}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default DatePicker;
