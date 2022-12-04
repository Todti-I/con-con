import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext, useValue } from 'con-con/hooks';
import SearchBar from 'con-con/screens/SearchRecipesStack/SearchBar';
import {
  RecipesStackParamList,
  SearchRecipesStackParamList,
} from 'con-con/types/navigation';
import { SearchRecipesData } from 'con-con/types/recipes';
import { ScrollView } from 'native-base';
import { useLayoutEffect, useMemo } from 'react';
import AddIngredientsButton from './AddIngredientsButton';
import MultipleSelectionBlock from './MultipleSelectionBlock';
import SelectionBlock from './SelectionBlock';

type Props = CompositeScreenProps<
  NativeStackScreenProps<SearchRecipesStackParamList, 'Filters'>,
  NativeStackScreenProps<RecipesStackParamList>
>;

const mealTypeFilters = [
  { id: 0, name: 'Завтрак' },
  { id: 1, name: 'Обед' },
  { id: 1, name: 'Ужин' },
  { id: 2, name: 'Перекус' },
];

const kilocaloriesFilters = [
  { id: 0, name: 'До 200 ккал' },
  { id: 1, name: '200-400 ккал' },
  { id: 2, name: '400-600 ккал' },
  { id: 3, name: '600-800 ккал' },
  { id: 4, name: 'Более 800 ккал' },
];

const cookingTimeFilters = [
  { id: 0, name: 'До 15 минут' },
  { id: 1, name: 'До 30 минут' },
  { id: 2, name: 'До 45 минут' },
  { id: 3, name: 'До часа' },
  { id: 4, name: 'Более часа' },
];

const FiltersScreen = ({ navigation, route }: Props) => {
  const { ingredients } = useAppContext();
  const data = useValue({ ...route.params });

  const handleChange = (dataPart: Partial<SearchRecipesData>) => {
    data.set({ ...data.get, ...dataPart });
  };

  const ingredientsData = useMemo(() => {
    const ids = new Set(route.params?.ingredientIds || []);
    return ingredients.get.filter((i) => ids.has(i.id));
  }, [route.params?.ingredientIds?.length]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerTitle: () => (
        <SearchBar
          defaultValue={data.get.title}
          onSearch={(title) => handleChange({ title })}
          onBack={() => navigation.navigate('CookBook', data.get)}
        />
      ),
    });
  }, [navigation.getId()]);

  return (
    <ScrollView py={2} flex={1} bg="#F7F7F7">
      <SelectionBlock
        defaultId={data.get.mealTypeId}
        name="Тип приема пищи"
        filters={mealTypeFilters}
        onChoose={(mealTypeId) => handleChange({ mealTypeId })}
      />
      <SelectionBlock
        defaultId={data.get.kilocaloriesId}
        name="Калорийность на 100г"
        filters={kilocaloriesFilters}
        onChoose={(kilocaloriesId) => handleChange({ kilocaloriesId })}
      />
      <SelectionBlock
        defaultId={data.get.cookingTimeId}
        name="Время приготовления"
        filters={cookingTimeFilters}
        onChoose={(cookingTimeId) => handleChange({ cookingTimeId })}
      />
      <MultipleSelectionBlock
        defaultIds={data.get.ingredientIds}
        name="Время приготовления"
        filters={ingredientsData}
        onChoose={(ingredientIds) => handleChange({ ingredientIds })}
      />
      <AddIngredientsButton
        onPress={() => navigation.navigate('Ingredients', data.get)}
      />
    </ScrollView>
  );
};

FiltersScreen.screenName = 'Filters' as const;

export default FiltersScreen;
