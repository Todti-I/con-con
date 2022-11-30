import api from 'con-con/api';
import BasketProductData from 'con-con/types/basket-product-data';
import { defaultMealsData, MealsData, RecipeData } from 'con-con/types/recipes';
import isDefined from 'con-con/utils/is-defined';
import storage from 'con-con/utils/storage';
import dayjs from 'dayjs';
import { Box } from 'native-base';
import { createContext, ProviderProps, useContext, useMemo } from 'react';
import useDebounce from './useDebounce';
import useLoadingState from './useLoadingState';
import useMethodAfterMount from './useMethodAfterMount';
import useSubscriptions, { UseSubscriptions } from './useSubscriptions';
import useValue, { ValueRef } from './useValue';

type SubscribeKey = 'favorite-recipes' | 'meals-data';

type AppContent = {
  subscriptions: UseSubscriptions<SubscribeKey>;
  isWizardComplete: ValueRef<boolean>;
  basketProducts: ValueRef<BasketProductData[]>;
  favoriteRecipes: ValueRef<RecipeData[]>;
  mealsData: ValueRef<MealsData>;
};

const AppContext = createContext<AppContent>({
  subscriptions: { subscribe: () => () => {}, ping: () => {} },
  isWizardComplete: { get: false, set: () => {} },
  basketProducts: { get: [], set: () => {} },
  favoriteRecipes: { get: [], set: () => {} },
  mealsData: { get: defaultMealsData(), set: () => {} },
});

const fetchData = async () => {
  let [
    wizardData,
    basketProducts = [],
    favoriteRecipes = [],
    mealsData = defaultMealsData(),
  ] = await Promise.all([
    storage.getItem('wizard-data'),
    storage.getItem('basket-products'),
    storage.getItem('favorite-recipes'),
    storage.getItem('meals-data'),
  ]);

  return { wizardData, basketProducts, favoriteRecipes, mealsData };
};

const updateMealsIfNeeded = async (mealsData: MealsData) => {
  const currentDay = dayjs().startOf('day');

  if (
    !mealsData.date ||
    dayjs(mealsData.date).startOf('day').isBefore(currentDay)
  ) {
    console.warn('Update meals');
    const diets = await api.diet.getDiet(1800);

    return {
      isUpdated: true,
      data: {
        date: currentDay.toISOString(),
        meals: {
          breakfast: [diets[0]].filter(isDefined),
          dinner: [diets[2]].filter(isDefined),
          lunch: [diets[4]].filter(isDefined),
          supper: [diets[1], diets[4]].filter(isDefined),
        },
      } as MealsData,
    };
  }

  return { isUpdated: false, data: mealsData };
};

export const AppProvider = (
  props: Omit<ProviderProps<AppContent>, 'value'>
) => {
  const debounce = useDebounce(300);
  const { isLoading, setIsLoading } = useLoadingState(true);
  const subscriptions = useSubscriptions<SubscribeKey>();

  const isWizardComplete = useValue(false);
  const basketProducts = useValue<BasketProductData[]>([], {
    onUpdate: (newValue) => {
      const key = 'basket-products';
      debounce.set(() => storage.setItem(key, newValue), key);
    },
  });
  const favoriteRecipes = useValue<RecipeData[]>([], {
    onUpdate: (newValue) => {
      const key = 'favorite-recipes';
      debounce.set(() => storage.setItem(key, newValue), key);
      subscriptions.ping(key);
    },
  });
  const mealsData = useValue(defaultMealsData(), {
    onUpdate: (newValue) => {
      const key = 'meals-data';
      debounce.set(() => storage.setItem(key, newValue), key);
      subscriptions.ping(key);
    },
  });

  useMethodAfterMount(fetchData, {
    onStartLoading: () => setIsLoading(true),
    onEndLoading: () => setIsLoading(false),
    next: async (data) => {
      const updatedMeals = await updateMealsIfNeeded(data.mealsData);
      isWizardComplete.set(Boolean(data.wizardData));
      basketProducts.set(data.basketProducts, true);
      favoriteRecipes.set(data.favoriteRecipes, true);
      mealsData.set(updatedMeals.data, !updatedMeals.isUpdated);
    },
  });

  return (
    <AppContext.Provider
      {...props}
      // TODO добавить экран загрузки
      children={isLoading ? <Box /> : props.children}
      value={useMemo(() => {
        return {
          subscriptions,
          isWizardComplete,
          basketProducts,
          favoriteRecipes,
          mealsData,
        };
      }, [isLoading])}
    />
  );
};

export default () => useContext(AppContext);
