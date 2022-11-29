import storage from 'con-con/utils/storage';
import { Box } from 'native-base';
import { createContext, ProviderProps, useContext, useMemo } from 'react';
import useLoadingState from './useLoadingState';
import useMethodAfterMount from './useMethodAfterMount';
import useSubscriptions, { UseSubscriptions } from './useSubscriptions';
import useValue, { ValueRef } from './useValue';

type AppContent = {
  isWizardComplete: ValueRef<boolean>;
  subscriptions: UseSubscriptions;
};

const AppContext = createContext<AppContent>({
  isWizardComplete: { get: false, set: () => {} },
  subscriptions: { subscribe: () => () => {}, ping: () => {} },
});

export const AppProvider = (
  props: Omit<ProviderProps<AppContent>, 'value'>
) => {
  const { isLoading, setIsLoading } = useLoadingState(true);
  const subscriptions = useSubscriptions();

  const isWizardComplete = useValue(false);

  useMethodAfterMount(() => Promise.all([storage.getItem('wizard-data')]), {
    onStartLoading: () => setIsLoading(true),
    onEndLoading: () => setIsLoading(false),
    next: ([wizardData]) => {
      isWizardComplete.set(Boolean(wizardData));
    },
  });

  return (
    <AppContext.Provider
      {...props}
      children={isLoading ? <Box /> : props.children}
      value={useMemo(() => ({ isWizardComplete, subscriptions }), [isLoading])}
    />
  );
};

export default () => useContext(AppContext);
