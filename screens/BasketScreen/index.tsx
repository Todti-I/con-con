import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import DateRow from 'con-con/components/DateRow';
import {
  useDebounce,
  useForceUpdate,
  useLoadingState,
  useValue,
} from 'con-con/hooks';
import storage from 'con-con/utils/storage';
import { Box, FlatList, Skeleton } from 'native-base';
import { useEffect, useRef } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { RootStackParamList } from '../types';
import AddProductButton from './AddProductButton';
import BasketEmpty from './BasketEmpty';
import ProductCard from './ProductCard';
import { ProductData } from './types';

const keyStorage = 'basket';
const skeletonData = [...Array(10)].map<ProductData>((_, id) => ({
  id,
  name: '',
  grams: 0,
  isChecked: false,
}));

const BasketScreen = (
  _: NativeStackScreenProps<RootStackParamList, 'Basket'>
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
    newData.length === 0 && forceUpdate();
  };

  const renderItem = ({ item }: ListRenderItemInfo<ProductData>) => (
    <ProductCard item={item} onCheck={handleCheck} onRemove={handleRemove} />
  );

  const renderSkeletonItem = () => (
    <Skeleton
      mb={2}
      flex={1}
      h="64px"
      borderRadius={8}
      startColor="text.300"
      endColor="text.200"
    />
  );

  return (
    <Box flex={1} position="relative" bg="#F7F7F7">
      <FlatList
        px={4}
        data={isLoading ? skeletonData : data.get}
        ListEmptyComponent={BasketEmpty}
        ListHeaderComponent={DateRow}
        ListHeaderComponentStyle={{ marginVertical: 16, alignItems: 'center' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={isLoading ? renderSkeletonItem : renderItem}
      />
      <AddProductButton onAdd={handleAdd} />
    </Box>
  );
};

BasketScreen.screenName = 'Basket' as const;
BasketScreen.screenOptions = {
  headerShown: true,
  headerTitle: 'Список покупок',
  headerTitleStyle: {
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
} as NativeStackNavigationOptions;

export default BasketScreen;
