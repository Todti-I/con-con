import { IInputProps, Input, Text } from 'native-base';

type Props = {
  isFloat?: boolean;
  defaultValue?: number;
  onChange?: (value: number) => void;
  unitName?: string;
} & Omit<IInputProps, 'onChange'>;

const NumberInput = ({
  isFloat,
  defaultValue,
  onChange,
  unitName,
  ...props
}: Props) => {
  const handleChange = (value: string) => {
    const number = isFloat
      ? parseFloat(value.replace(/,+/g, '.').replace(/[^0-9\.]+/g, ''))
      : parseInt(value.replace(/[^0-9\.]+/g, ''));
    onChange?.(number || 0);
  };

  return (
    <Input
      keyboardType="numeric"
      variant="underlined"
      color="text.900"
      fontSize="4xl"
      fontWeight={500}
      textAlign="center"
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
