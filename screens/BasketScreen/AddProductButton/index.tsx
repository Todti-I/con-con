import BasketProductData from 'con-con/types/basket-product-data';
import { AddIcon, IconButton } from 'native-base';
import { memo, useRef, useState } from 'react';

import AddProductWindow from './AddProductWindow';

type Props = {
  onAdd?: (product: BasketProductData) => Promise<void>;
};

const AddProductButton = ({ onAdd }: Props) => {
  const windowKey = useRef(0);
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
        onPress={() => {
          windowKey.current++;
          setIsOpen(true);
        }}
        icon={<AddIcon size={6} />}
      />
      <AddProductWindow
        key={windowKey.current}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={onAdd}
      />
    </>
  );
};

export default memo(AddProductButton, () => true);
