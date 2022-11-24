import { ITextProps, Text } from 'native-base';
import { useState } from 'react';
import Input, { InputProps } from './Input';

type Props = {
  isFloat?: boolean;
  defaultValue?: number;
  onChange?: (value: number) => void;
  unitName?: string;
  unitProps?: ITextProps;
} & Omit<InputProps, 'defaultValue' | 'onChange'>;

const convertToNumber = (value: string, isFloat?: boolean) => {
  return isFloat
    ? parseFloat(value.replace(/,+/g, '.').replace(/[^0-9\.]+/g, ''))
    : parseInt(value.replace(/[^0-9]+/g, ''));
};

const normalizeValue = (value: string, isFloat?: boolean) => {
  if (!isFloat) return value.replace(/[^0-9]+/g, '');

  return value
    .replace(/[^0-9\.]+/g, '.')
    .replace(/^\.+/g, '')
    .split('.')
    .reduce((result, current, i) => result + (i == 1 ? '.' : '') + current, '');
};

const NumberInput = ({
  isFloat,
  defaultValue,
  onChange,
  unitName,
  unitProps,
  ...props
}: Props) => {
  const [value, setValue] = useState((defaultValue || '').toString());

  const handleChange = (value: string) => {
    onChange?.(convertToNumber(value, isFloat) || 0);
    setValue(value);
  };

  return (
    <Input
      keyboardType="numeric"
      variant="underlined"
      color="text.900"
      fontSize="4xl"
      fontWeight={500}
      textAlign="center"
      value={normalizeValue(value, isFloat)}
      onChangeText={handleChange}
      rightElement={
        unitName ? (
          <Text
            color="text.500"
            fontSize="2xl"
            fontWeight={500}
            textTransform="uppercase"
            children={unitName}
            {...unitProps}
          />
        ) : undefined
      }
      {...props}
    />
  );
};

export default NumberInput;
