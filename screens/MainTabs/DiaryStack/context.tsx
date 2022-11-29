import useSubscriptions, {
  UseSubscriptions,
} from 'con-con/hooks/useSubscriptions';
import useValue, { ValueRef } from 'con-con/hooks/useValue';
import RecipeData from 'con-con/types/recipe-data';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { diet } from './mock-data';
import { MealType } from './types';

type DiaryContent = {
  meals: ValueRef<Map<MealType, RecipeData[]>>;
  subscriptions: UseSubscriptions;
};

const DiaryContext = createContext<DiaryContent>({
  meals: { get: new Map(), set: () => {} },
  subscriptions: { subscribe: () => () => {}, ping: () => {} },
});

export const useDiaryContext = () => useContext(DiaryContext);

type DiaryProviderProps = {
  children: ReactNode;
};

export const DiaryProvider = ({ children }: DiaryProviderProps) => {
  const meals = useValue(defaultMeals);
  const subscriptions = useSubscriptions();

  return (
    <DiaryContext.Provider
      children={children}
      value={useMemo(() => {
        return {
          meals,
          subscriptions,
        };
      }, [])}
    />
  );
};

const defaultMeals = new Map<MealType, RecipeData[]>([
  ['breakfast', [diet[0]]],
  ['dinner', [diet[2]]],
  ['lunch', [diet[4]]],
  ['supper', [diet[1], diet[3]]],
]);
