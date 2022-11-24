import { AddIcon, IconButton } from 'native-base';
import { useState } from 'react';
import { ProductData } from '../types';
import AddProductWindow from './AddProductWindow';

type Props = {
  onAdd?: (product: ProductData) => Promise<void>;
};

const AddProductButton = ({ onAdd }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        bottom={4}
        right={4}
        position="absolute"
        boxSize="56px"
        variant="solid"
        borderRadius="full"
        onPress={() => setIsOpen(true)}
        icon={<AddIcon size={6} />}
      />
      <AddProductWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={onAdd}
      />
    </>
  );
};

export default AddProductButton;
