import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useValue } from 'con-con/hooks';
import SearchBar from 'con-con/screens/SearchRecipesStack/SearchBar';
import { SearchRecipesStackParamList } from 'con-con/types/navigation';
import {
  CookingTimeFilter,
  KilocaloriesFilter,
  MealTypeFilter,
  SearchRecipesData,
} from 'con-con/types/recipes';
import { Box, ScrollView } from 'native-base';
import { useLayoutEffect, useMemo, useState } from 'react';
import ControlButtons from './ControlButtons';
import IngredientsBlock from './IngredientsBlock';
import SelectionBlock from './SelectionBlock';

const mealTypeFilters = [
  { id: MealTypeFilter.Breakfast, name: 'Завтрак' },
  { id: MealTypeFilter.Dinner, name: 'Обед/Ужин' },
  { id: MealTypeFilter.Supper, name: 'Перекус' },
];

const kilocaloriesFilters = [
  { id: KilocaloriesFilter.To200, name: 'До 200 ккал' },
  { id: KilocaloriesFilter.From200To400, name: '200-400 ккал' },
  { id: KilocaloriesFilter.From400, name: 'Более 400 ккал' },
];

const cookingTimeFilters = [
  { id: CookingTimeFilter.To15, name: 'До 15 минут' },
  { id: CookingTimeFilter.To30, name: 'До 30 минут' },
  { id: CookingTimeFilter.To45, name: 'До 45 минут' },
  { id: CookingTimeFilter.To60, name: 'До часа' },
  { id: CookingTimeFilter.From60, name: 'Более часа' },
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
          defaultId={data.get.mealTypeFilter}
          name="Тип приема пищи"
          filters={mealTypeFilters}
          onChoose={(mealTypeId) =>
            handleChange({ mealTypeFilter: mealTypeId })
          }
        />
        <SelectionBlock
          defaultId={data.get.kilocaloriesFilter}
          name="Калорийность на 100г"
          filters={kilocaloriesFilters}
          onChoose={(kilocaloriesId) =>
            handleChange({ kilocaloriesFilter: kilocaloriesId })
          }
        />
        <SelectionBlock
          defaultId={data.get.cookingTimeFilter}
          name="Время приготовления"
          filters={cookingTimeFilters}
          onChoose={(cookingTimeId) =>
            handleChange({ cookingTimeFilter: cookingTimeId })
          }
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
