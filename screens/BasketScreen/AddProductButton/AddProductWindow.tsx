import Input from 'con-con/components/Input';
import NumberInput from 'con-con/components/NumberInput';
import Window, { WindowProps } from 'con-con/components/Window';
import { useLoadingState } from 'con-con/hooks';
import BasketProductData from 'con-con/types/basket-product-data';
import { useState } from 'react';
import uuid from 'react-native-uuid';

type Props = {
  onAdd?: (product: BasketProductData) => Promise<void>;
};

const AddProductWindow = ({ isOpen, onClose, onAdd }: WindowProps<Props>) => {
  const { isLoading, trackLoading } = useLoadingState(false);
  const [data, setData] = useState<BasketProductData>({
    id: '',
    name: '',
    grams: 0,
    isChecked: false,
  });

  const handleAdd = () =>
    trackLoading(async () => {
      await onAdd?.({ ...data, id: uuid.v4().toString() });
      onClose();
    });

  const handleChange = (partProduct: Partial<BasketProductData>) => {
    setData((data) => ({ ...data, ...partProduct }));
  };

  return (
    <Window
      isOpen={isOpen}
      onClose={onClose}
      heading="Добавить продукт"
      submitProps={{
        isLoading,
        isLoadingText: 'Добавляем',
        isDisabled: data.name.trim().length === 0,
        onPress: handleAdd,
        children: 'Добавить',
      }}
    >
      <Input
        px={4}
        py={2}
        fontWeight={500}
        fontSize="md"
        label="Название продукта"
        onChangeText={(name) => handleChange({ name })}
      />
      <NumberInput
        px={4}
        py={2}
        label="Количество"
        variant="outline"
        color="text.900"
        fontSize="md"
        fontWeight={500}
        textAlign="left"
        unitName="грамм"
        unitProps={{ pr: 4, textTransform: 'lowercase' }}
        formControlProps={{ mt: 4 }}
        onChange={(grams) => handleChange({ grams })}
      />
    </Window>
  );
};
export default AddProductWindow;
