import { useFocusEffect } from '@react-navigation/native';
import { UseSubscriptions } from 'con-con/hooks/useSubscriptions';
import { ValueRef } from 'con-con/hooks/useValue';
import { createContext, DependencyList, useContext, useEffect } from 'react';
import { WizardData } from './types';

type WizardContent = {
  pageNumber: ValueRef<number>;
  data: ValueRef<Partial<WizardData>>;
  subscriptions: UseSubscriptions;
  onComplete: () => void;
};

const WizardContext = createContext<WizardContent>({
  pageNumber: { get: 0, set: () => {} },
  data: { get: {}, set: () => {} },
  subscriptions: { subscribe: () => () => {}, ping: () => {} },
  onComplete: () => {},
});

export const WizardProvider = WizardContext.Provider;

export const useWizardContext = () => useContext(WizardContext);

export const useDataUpdates = () => {
  const { data } = useWizardContext();

  const update = (newData: Partial<WizardData>) => {
    data.set({ ...data.get, ...newData });
  };

  const useUpdate = (newData: Partial<WizardData>, deps: DependencyList) => {
    return useEffect(() => {
      update(newData);
    }, deps);
  };

  return {
    data: data.get,
    update,
    useUpdate,
  };
};

export const useProgressUpdates = (newPageNumber: number) => {
  const { pageNumber, subscriptions } = useWizardContext();

  useFocusEffect(() => {
    pageNumber.set(newPageNumber);
    subscriptions.ping('progress');
  });
};
