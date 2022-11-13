import { createContext, FC, ProviderProps, useContext } from 'react';
import useForceUpdate from './useForceUpdate';
import useValue, { ValueRef } from './useValue';

type AppContent = {
  forceUpdate: () => void;
  isWizardComplete: ValueRef<boolean>;
};

const AppContext = createContext<AppContent>({
  forceUpdate: () => {},
  isWizardComplete: { get: false, set: () => {} },
});

export const AppProvider = (
  props: Omit<ProviderProps<AppContent>, 'value'>
) => {
  const forceUpdate = useForceUpdate();
  const isWizardComplete = useValue(false);

  return (
    <AppContext.Provider value={{ forceUpdate, isWizardComplete }} {...props} />
  );
};

export default () => useContext(AppContext);
