import useSubscriptions, {
  UseSubscriptions,
} from 'con-con/hooks/useSubscriptions';
import { MealType } from 'con-con/types/recipes';
import { createContext, ReactNode, useContext, useMemo } from 'react';

type DiaryContent = {
  subscriptions: UseSubscriptions<`meal-card-${MealType}`>;
};

const DiaryContext = createContext<DiaryContent>({
  subscriptions: { subscribe: () => () => {}, ping: () => {} },
});

export const useDiaryContext = () => useContext(DiaryContext);

type DiaryProviderProps = {
  children: ReactNode;
};

export const DiaryProvider = ({ children }: DiaryProviderProps) => {
  const subscriptions = useSubscriptions();

  return (
    <DiaryContext.Provider
      children={children}
      value={useMemo(() => ({ subscriptions }), [])}
    />
  );
};
