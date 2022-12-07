import Alert from 'con-con/components/Alert';
import TrashIcon from 'con-con/icons/TrashIcon';
import { IconButton } from 'native-base';
import { memo, useState } from 'react';

type Props = {
  onClear?: () => void;
};

const ClearBasketButton = ({ onClear }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    setIsOpen(false);
    onClear?.();
  };

  return (
    <>
      <IconButton
        bottom={20}
        right={4}
        position="absolute"
        variant="solid"
        borderRadius="full"
        colorScheme="red"
        onPress={() => setIsOpen(true)}
        icon={<TrashIcon size={4} />}
      />
      <Alert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        heading="Очистка корзины"
        onSubmit={handleClear}
        children="Вы уверены, что хотите очистить корзину?"
      />
    </>
  );
};

export default memo(ClearBasketButton, () => true);
