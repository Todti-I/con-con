import api from 'con-con/api';
import LoadingScreen from 'con-con/screens/LoadingScreen';
import BasketProductData from 'con-con/types/basket-product-data';
import { defaultMealsData, MealsData, RecipeData } from 'con-con/types/recipes';
import { defaultUserData, UserData } from 'con-con/types/user';
import { WizardData } from 'con-con/types/wizard-data';
import calculateUserParams from 'con-con/utils/calculate-user-params';
import isDefined from 'con-con/utils/is-defined';
import storage from 'con-con/utils/storage';
import dayjs from 'dayjs';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import useDebounce from './useDebounce';
import useLoadingState from './useLoadingState';
import useMethodAfterMount from './useMethodAfterMount';
import useSubscriptions, { UseSubscriptions } from './useSubscriptions';
import useValue, { ValueRef } from './useValue';

type SubscribeKey = 'favorite-recipes' | 'meals-data' | 'wizard-data';

type AppContent = {
  subscriptions: UseSubscriptions<SubscribeKey>;
  wizardData: ValueRef<WizardData | undefined>;
  basketProducts: ValueRef<BasketProductData[]>;
  favoriteRecipes: ValueRef<RecipeData[]>;
  mealsData: ValueRef<MealsData>;
  userData: ValueRef<UserData>;
};

type AppProviderProps = {
  children: ReactNode;
};

const AppContext = createContext<AppContent>({
  subscriptions: { subscribe: () => () => {}, ping: () => {} },
  wizardData: { get: undefined, set: () => {} },
  basketProducts: { get: [], set: () => {} },
  favoriteRecipes: { get: [], set: () => {} },
  mealsData: { get: defaultMealsData(), set: () => {} },
  userData: { get: defaultUserData(), set: () => {} },
});

const fetchData = async () => {
  const [
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

const updateMealsIfNeeded = async (
  mealsData: MealsData,
  kilocalories: number
) => {
  const currentDay = dayjs().startOf('day');

  if (
    !mealsData.date ||
    dayjs(mealsData.date).startOf('day').isBefore(currentDay)
  ) {
    console.warn('Update meals' + mealsData.date);
    const diets = await api.diet.getDiet(kilocalories);

    return {
      isUpdated: true,
      data: {
        date: currentDay.toISOString(),
        meals: {
          breakfast: [diets[0]].filter(isDefined),
          dinner: [diets[2]].filter(isDefined),
          lunch: [diets[4]].filter(isDefined),
          supper: [diets[1], diets[3]].filter(isDefined),
        },
      } as MealsData,
    };
  }

  return { isUpdated: false, data: mealsData };
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const debounce = useDebounce(300);
  const { isLoading, setIsLoading } = useLoadingState(true);
  const subscriptions = useSubscriptions<SubscribeKey>();

  const wizardData = useValue<WizardData | undefined>(undefined, {
    onUpdate: (newValue) => {
      const key = 'wizard-data';
      if (newValue) {
        storage.setItem(key, newValue);
        userData.set(calculateUserParams(newValue));
        updateMealsIfNeeded(mealsData.get, userData.get.kilocalories).then(
          (updatedMeals) => {
            mealsData.set(updatedMeals.data, !updatedMeals.isUpdated);
            subscriptions.ping(key);
          }
        );
      } else {
        storage.removeItem(key);
        subscriptions.ping(key);
      }
    },
  });

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

  const userData = useValue(defaultUserData());

  useMethodAfterMount(fetchData, {
    onStartLoading: () => setIsLoading(true),
    onEndLoading: () => setIsLoading(false),
    next: async (data) => {
      wizardData.set(data.wizardData, true);

      if (data.wizardData) {
        userData.set(calculateUserParams(data.wizardData));

        const updatedMeals = await updateMealsIfNeeded(
          data.mealsData,
          userData.get.kilocalories
        );
        basketProducts.set(data.basketProducts, true);
        favoriteRecipes.set(data.favoriteRecipes, true);
        mealsData.set(updatedMeals.data, !updatedMeals.isUpdated);
      }
    },
  });

  return (
    <AppContext.Provider
      children={isLoading ? <LoadingScreen /> : children}
      value={useMemo(() => {
        return {
          subscriptions,
          wizardData,
          basketProducts,
          favoriteRecipes,
          mealsData,
          userData,
        };
      }, [isLoading])}
    />
  );
};

export default () => useContext(AppContext);
