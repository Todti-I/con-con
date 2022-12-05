import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext, useValue } from 'con-con/hooks';
import { SearchRecipesStackParamList } from 'con-con/types/navigation';
import { IngredientData } from 'con-con/types/recipes';
import { FlatList } from 'native-base';
import { useLayoutEffect, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import SearchBar from '../SearchBar';
import IngredientCard from './IngredientCard';
import NotFoundIngredients from './NotFoundIngredients';

const IngredientsScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<SearchRecipesStackParamList, 'Ingredients'>) => {
  const { ingredients } = useAppContext();
  const [filteredIngredients, setFilteredIngredients] = useState(
    () => ingredients.get
  );
  const data = useValue({ ...route.params });

  const handlerFiltersIngredients = (value: string) => {
    const normalizeValue = value.trim().toLocaleLowerCase();
    setFilteredIngredients(
      ingredients.get.filter((i) =>
        i.name.toLowerCase().includes(normalizeValue)
      )
    );
  };

  const handleChooseIngredient = (id: string) => (isChosen: boolean) => {
    const newIngredientIds =
      data.get.ingredientIds?.filter((i) => i !== id) || [];

    if (isChosen) {
      data.set({ ...data.get, ingredientIds: [...newIngredientIds, id] });
    } else {
      data.set({ ...data.get, ingredientIds: newIngredientIds });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      animation: 'slide_from_right',
      headerBackVisible: false,
      headerTitle: () => (
        <SearchBar
          withDebounce
          placeholder="Поиск по ингредиентам"
          onChange={handlerFiltersIngredients}
          onBack={() => navigation.navigate('Filters', data.get)}
        />
      ),
    });
  }, [navigation.getId()]);

  const renderItem = ({ item }: ListRenderItemInfo<IngredientData>) => (
    <IngredientCard
      mb={4}
      name={item.name}
      defaultChosen={data.get.ingredientIds?.includes(item.id)}
      onChoose={handleChooseIngredient(item.id)}
    />
  );

  return (
    <FlatList
      bg="#F7F7F7"
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      keyExtractor={(item) => item.id}
      data={filteredIngredients}
      renderItem={renderItem}
      ListEmptyComponent={NotFoundIngredients}
    />
  );
};

IngredientsScreen.screenName = 'Ingredients' as const;

export default IngredientsScreen;
