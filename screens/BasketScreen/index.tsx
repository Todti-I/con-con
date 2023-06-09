import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import DateRow from 'con-con/components/DateRow';
import { useAppContext, useForceUpdate } from 'con-con/hooks';
import BasketProductData from 'con-con/types/basket-product-data';
import { RootStackParamList } from 'con-con/types/navigation';
import { Box, FlatList } from 'native-base';
import { ListRenderItemInfo } from 'react-native';
import AddProductButton from './AddProductButton';
import BasketEmpty from './BasketEmpty';
import ClearBasketButton from './ClearBasketButton';
import ProductCard from './ProductCard';

const BasketScreen = (
  _: NativeStackScreenProps<RootStackParamList, 'Basket'>
) => {
  const { basketProducts } = useAppContext();

  const forceUpdate = useForceUpdate();

  const handleAdd = async (product: BasketProductData) => {
    basketProducts.set([...basketProducts.get, product]);
    forceUpdate();
  };

  const handleCheck = (id: string, isChecked: boolean) => {
    basketProducts.set(
      basketProducts.get.map((d) => (d.id === id ? { ...d, isChecked } : d))
    );
  };

  const handleRemove = (id: string) => {
    const newData = basketProducts.get.filter((d) => d.id !== id);
    basketProducts.set(newData);
    newData.length === 0 && forceUpdate();
  };

  const handleClear = () => {
    basketProducts.set([]);
    forceUpdate();
  };

  const renderItem = ({ item }: ListRenderItemInfo<BasketProductData>) => (
    <ProductCard item={item} onCheck={handleCheck} onRemove={handleRemove} />
  );

  return (
    <Box flex={1} position="relative" bg="#F7F7F7">
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        data={basketProducts.get}
        ListEmptyComponent={BasketEmpty}
        ListHeaderComponent={DateRow}
        ListHeaderComponentStyle={{ marginVertical: 16, alignItems: 'center' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      {basketProducts.get.length > 0 && (
        <ClearBasketButton onClear={handleClear} />
      )}
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
