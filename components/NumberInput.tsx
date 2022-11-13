import { IInputProps, Input, Text } from 'native-base';
import { useState } from 'react';

type Props = {
  isFloat?: boolean;
  defaultValue?: number;
  onChange?: (value: number) => void;
  unitName?: string;
} & Omit<IInputProps, 'defaultValue' | 'onChange'>;

const convertToNumber = (value: string, isFloat?: boolean) => {
  return isFloat
    ? parseFloat(value.replace(/,+/g, '.').replace(/[^0-9\.]+/g, ''))
    : parseInt(value.replace(/[^0-9\.]+/g, ''));
};

const normalizeValue = (value: string) => {
  return value.replace(/[^0-9\.]+/g, '.');
};

const NumberInput = ({
  isFloat,
  defaultValue,
  onChange,
  unitName,
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
      value={normalizeValue(value)}
      onChangeText={handleChange}
      rightElement={
        unitName ? (
          <Text
            color="text.500"
            fontSize="2xl"
            fontWeight={500}
            textTransform="uppercase"
            children={unitName}
          />
        ) : undefined
      }
      {...props}
    />
  );
};

export default NumberInput;
