import useSubscriptions, {
  UseSubscriptions,
} from 'con-con/hooks/useSubscriptions';
import useValue, { ValueRef } from 'con-con/hooks/useValue';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { MealType, Recipe } from './types';

type DiaryContent = {
  meals: ValueRef<Map<MealType, Recipe[]>>;
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

const recipe: Recipe = {
  id: '8abb597b-3a2a-4d7f-85db-009082276394',
  title: 'Пирог с капустой',
  carbohydrate: 55,
  protein: 23,
  fat: 12,
  kilocalories: 351,
  cookingTime: 15,
  mealType: 'lunch',
};

const defaultMeals = new Map<MealType, Recipe[]>([
  ['breakfast', [recipe]],
  ['dinner', [recipe]],
  ['lunch', [recipe]],
  ['supper', [recipe]],
]);
