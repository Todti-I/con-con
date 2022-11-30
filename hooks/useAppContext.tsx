import BasketProductData from 'con-con/types/basket-product-data';
import RecipeData from 'con-con/types/recipe-data';
import storage from 'con-con/utils/storage';
import { Box } from 'native-base';
import { createContext, ProviderProps, useContext, useMemo } from 'react';
import useDebounce from './useDebounce';
import useLoadingState from './useLoadingState';
import useMethodAfterMount from './useMethodAfterMount';
import useSubscriptions, { UseSubscriptions } from './useSubscriptions';
import useValue, { ValueRef } from './useValue';

type SubscribeKey = 'favorite-recipes';

type AppContent = {
  subscriptions: UseSubscriptions<SubscribeKey>;
  isWizardComplete: ValueRef<boolean>;
  basketProducts: ValueRef<BasketProductData[]>;
  favoriteRecipes: ValueRef<RecipeData[]>;
};

const AppContext = createContext<AppContent>({
  subscriptions: { subscribe: () => () => {}, ping: () => {} },
  isWizardComplete: { get: false, set: () => {} },
  basketProducts: { get: [], set: () => {} },
  favoriteRecipes: { get: [], set: () => {} },
});

const fetchData = async () => {
  const [wizardData, basketProducts = [], favoriteRecipes = []] =
    await Promise.all([
      storage.getItem('wizard-data'),
      storage.getItem('basket-products'),
      storage.getItem('favorite-recipes'),
    ]);

  return { wizardData, basketProducts, favoriteRecipes };
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

  useMethodAfterMount(fetchData, {
    onStartLoading: () => setIsLoading(true),
    onEndLoading: () => setIsLoading(false),
    next: (data) => {
      isWizardComplete.set(Boolean(data.wizardData));
      basketProducts.set(data.basketProducts, true);
      favoriteRecipes.set(data.favoriteRecipes, true);
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
        };
      }, [isLoading])}
    />
  );
};

export default () => useContext(AppContext);
