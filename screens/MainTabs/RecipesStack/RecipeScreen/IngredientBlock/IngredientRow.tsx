import { HStack, Text } from 'native-base';
import { memo } from 'react';

type Props = {
  name: string;
  value: number;
};

const IngredientRow = ({ name, value }: Props) => (
  <HStack p={4} space={2} alignItems="center" justifyContent="space-between">
    <Text flex={1} children={name} />
    <Text color="text.500" children={value ? `${value} г` : ''} />
  </HStack>
);

export default memo(IngredientRow);
