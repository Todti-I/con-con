import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import useValue from 'con-con/hooks/useValue';
import { Box, FlatList } from 'native-base';
import { ListRenderItemInfo } from 'react-native';
import { RootStackParamList } from '../types';
import BasketEmpty from './BasketEmpty';
import BasketHeader from './BasketHeader';
import ProductCard from './ProductCard';
import { ProductData } from './types';

const lists: ProductData[] = [
  { id: 1, name: 'Картошка', grams: 500, isChecked: false },
  { id: 2, name: 'Кетчуп', grams: 250, isChecked: false },
  { id: 3, name: 'Моцарелла', grams: 40, isChecked: false },
  { id: 4, name: 'Соевый соус', grams: 54, isChecked: true },
  { id: 5, name: 'Соль', grams: 0, isChecked: false },
  ...[...Array(20)].map((_, id) => ({
    id: id + 6,
    name: 'Соль',
    grams: 0,
    isChecked: false,
  })),
];

const BasketScreen = (
  props: NativeStackScreenProps<RootStackParamList, 'Basket'>
) => {
  const data = useValue(lists);

  const handleCheck = (id: number, isChecked: boolean) => {
    data.set(data.get.map((d) => (d.id === id ? { ...d, isChecked } : d)));
  };

  const handleRemove = (id: number) => {
    data.set(data.get.filter((d) => d.id !== id));
  };

  const renderItem = ({ item }: ListRenderItemInfo<ProductData>) => (
    <ProductCard item={item} onCheck={handleCheck} onRemove={handleRemove} />
  );

  return (
    <Box flex={1} bg="#F7F7F7">
      <FlatList
        px={4}
        data={[]}
        ListEmptyComponent={BasketEmpty}
        ListHeaderComponent={BasketHeader}
        ListHeaderComponentStyle={{ marginVertical: 16, alignItems: 'center' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </Box>
  );
};

BasketScreen.screenName = 'Basket' as const;
BasketScreen.screenOptions = {
  headerShown: true,
  headerTitle: 'Список покупок',
} as NativeStackNavigationOptions;

export default BasketScreen;
