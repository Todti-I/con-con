import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useValue } from 'con-con/hooks';
import SearchBar from 'con-con/screens/SearchRecipesStack/SearchBar';
import { SearchRecipesStackParamList } from 'con-con/types/navigation';
import { SearchRecipesData } from 'con-con/types/recipes';
import { Box, ScrollView } from 'native-base';
import { useLayoutEffect, useMemo, useState } from 'react';
import ControlButtons from './ControlButtons';
import IngredientsBlock from './IngredientsBlock';
import SelectionBlock from './SelectionBlock';

const mealTypeFilters = [
  { id: 0, name: 'Завтрак' },
  { id: 1, name: 'Обед' },
  { id: 2, name: 'Ужин' },
  { id: 3, name: 'Перекус' },
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

const FiltersScreen = ({
  navigation,
  route: {
    params: { forScreen, ...defaultData },
  },
}: NativeStackScreenProps<SearchRecipesStackParamList, 'Filters'>) => {
  const data = useValue(defaultData);
  const [resetKey, setResetKey] = useState(0);

  useMemo(
    () => data.set(defaultData),
    [forScreen, JSON.stringify(defaultData)]
  );

  const handleChange = (dataPart: Partial<SearchRecipesData>) => {
    data.set({ ...data.get, ...dataPart });
  };

  const handleSubmit = () => {
    navigation.navigate(forScreen as any, data.get);
  };

  const handleReset = () => {
    data.set({});
    setResetKey(resetKey + 1);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerTitle: () => (
        <SearchBar
          key={resetKey}
          placeholder="Поиск по рецептам"
          defaultValue={data.get.title}
          onChange={(title) => handleChange({ title })}
          onBack={handleSubmit}
        />
      ),
    });
  }, [navigation.getId(), resetKey, forScreen]);

  const goToIngredients = (type: 'include' | 'exclude') => () =>
    navigation.navigate('Ingredients', {
      forScreen,
      type,
      ...data.get,
    });

  return (
    <Box flex={1} bg="white">
      <ScrollView
        key={resetKey}
        flex={1}
        bg="#F7F7F7"
        contentContainerStyle={{ paddingBottom: 8 }}
      >
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
        <IngredientsBlock
          name="Добавить продукт"
          defaultIngredientIds={data.get.includeIngredientIds}
          onChoose={(includeIngredientIds) =>
            handleChange({ includeIngredientIds })
          }
          goToIngredients={goToIngredients('include')}
        />
        <IngredientsBlock
          name="Исключить продукт"
          defaultIngredientIds={data.get.excludeIngredientIds}
          onChoose={(excludeIngredientIds) =>
            handleChange({ excludeIngredientIds })
          }
          goToIngredients={goToIngredients('exclude')}
        />
      </ScrollView>
      <ControlButtons onSubmit={handleSubmit} onReset={handleReset} />
    </Box>
  );
};

FiltersScreen.screenName = 'Filters' as const;

export default FiltersScreen;
