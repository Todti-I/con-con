import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import useDebounce from 'con-con/hooks/useDebounce';
import useForceUpdate from 'con-con/hooks/useForceUpdate';
import useLoadingState from 'con-con/hooks/useLoadingState';
import useValue from 'con-con/hooks/useValue';
import storage from 'con-con/utils/storage';
import { Box, FlatList } from 'native-base';
import { useEffect, useRef } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { RootStackParamList } from '../types';
import AddProductButton from './AddProductButton';
import BasketEmpty from './BasketEmpty';
import BasketHeader from './BasketHeader';
import ProductCard from './ProductCard';
import { ProductData } from './types';

const keyStorage = 'basket';

const BasketScreen = (
  props: NativeStackScreenProps<RootStackParamList, 'Basket'>
) => {
  const generateId = useRef(0);
  const forceUpdate = useForceUpdate();
  const data = useValue<ProductData[]>([]);
  const debounce = useDebounce(300);
  const { isLoading, trackLoading } = useLoadingState(true);

  useEffect(() => {
    trackLoading(async () => {
      const products = await storage.getItem<ProductData[]>(keyStorage);
      data.set(
        (products || []).map((p) => ({ ...p, id: generateId.current++ }))
      );
    });
  }, []);

  if (isLoading) {
    return null;
  }

  const handleAdd = async (product: ProductData) => {
    const newData = [...data.get, { ...product, id: generateId.current++ }];
    await storage.setItem(keyStorage, newData);
    data.set(newData);
    forceUpdate();
  };

  const handleCheck = (id: number, isChecked: boolean) => {
    const newData = data.get.map((d) =>
      d.id === id ? { ...d, isChecked } : d
    );
    data.set(newData);
    debounce.set(() => storage.setItem(keyStorage, newData));
  };

  const handleRemove = (id: number) => {
    const newData = data.get.filter((d) => d.id !== id);
    data.set(newData);
    debounce.set(() => storage.setItem(keyStorage, newData));
  };

  const renderItem = ({ item }: ListRenderItemInfo<ProductData>) => (
    <ProductCard item={item} onCheck={handleCheck} onRemove={handleRemove} />
  );

  return (
    <Box flex={1} position="relative" bg="#F7F7F7">
      <FlatList
        px={4}
        data={data.get}
        ListEmptyComponent={BasketEmpty}
        ListHeaderComponent={BasketHeader}
        ListHeaderComponentStyle={{ marginVertical: 16, alignItems: 'center' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <AddProductButton onAdd={handleAdd} />
    </Box>
  );
};

BasketScreen.screenName = 'Basket' as const;
BasketScreen.screenOptions = {
  headerShown: true,
  headerTitle: 'Список покупок',
} as NativeStackNavigationOptions;

export default BasketScreen;
