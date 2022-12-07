import { Button, HStack } from 'native-base';

type Props = {
  onSubmit: () => void;
  onReset: () => void;
};

const ControlButtons = ({ onSubmit, onReset }: Props) => (
  <HStack
    p={4}
    space={4}
    borderTopWidth="1px"
    borderTopStyle="solid"
    borderTopColor="text.300"
  >
    <Button
      flex={1}
      variant="outline"
      borderRadius={8}
      colorScheme="gray"
      _text={{ color: 'text.400', fontWeight: '500' }}
      children="Сбросить"
      onPress={onReset}
    />
    <Button
      flex={1}
      variant="outline"
      borderRadius={8}
      borderColor="primary.600"
      _text={{ fontWeight: '500' }}
      children="Применить"
      onPress={onSubmit}
    />
  </HStack>
);

export default ControlButtons;
