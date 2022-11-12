import { IInputProps, Input, Text } from 'native-base';

type Props = {
  defaultValue?: number;
  onChange?: (value: number) => void;
  unitName?: string;
} & Omit<IInputProps, 'onChange'>;

const NumberInput = ({ defaultValue, onChange, unitName, ...props }: Props) => {
  const handleChange = (value: string) => {
    const number = parseInt(value.replace(/[^0-9\.]+/g, '')) || 0;
    onChange?.(number);
  };

  return (
    <Input
      keyboardType="numeric"
      variant="underlined"
      color="text.900"
      fontSize="4xl"
      fontWeight={500}
      defaultValue={defaultValue}
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
