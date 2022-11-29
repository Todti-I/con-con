import HeartPlusIcon from 'con-con/icons/HeartPlusIcon';
import ThumbUpIcon from 'con-con/icons/ThumbUpIcon';
import { AddIcon, HStack, IconButton } from 'native-base';

type Props = {
  onAdd?: () => void;
  onNext?: () => void;
};

const ControlButtons = ({ onAdd, onNext }: Props) => (
  <HStack mt={4} space={5} justifyContent="center" alignItems="center">
    <IconButton
      shadow="0"
      bg="text.50"
      boxSize="60px"
      variant="solid"
      borderRadius="full"
      _pressed={{ bg: 'text.200' }}
      onPress={onNext}
      icon={
        <ThumbUpIcon
          size="28px"
          color="red.500"
          style={{ transform: [{ rotate: '180deg' }] }}
        />
      }
    />
    <IconButton
      shadow="0"
      boxSize="80px"
      variant="solid"
      borderRadius="full"
      colorScheme="violet"
      onPress={onAdd}
      icon={<AddIcon size="45px" />}
    />
    <IconButton
      shadow="0"
      bg="text.50"
      boxSize="60px"
      variant="solid"
      borderRadius="full"
      _pressed={{ bg: 'text.200' }}
      icon={<HeartPlusIcon size="28px" color="fuchsia.500" />}
    />
  </HStack>
);

export default ControlButtons;
