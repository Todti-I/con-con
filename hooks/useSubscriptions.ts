import { useMemo } from 'react';
import useValue from './useValue';

const useSubscriptions = () => {
  const subscriptions = useValue(new Map<string, () => void>());

  return useMemo(() => {
    const subscribe = (key: string, action: () => void) => {
      if (subscriptions.get.has(key)) {
        console.warn(`The key '${key}' already has a subscription`);
      }
      subscriptions.get.set(key, action);
      return key;
    };

    const unsubscribe = (key: string) => {
      subscriptions.get.delete(key);
    };

    const ping = (key: string) => {
      subscriptions.get.get(key)?.();
    };

    return {
      subscribe,
      unsubscribe,
      ping,
    };
  }, []);
};

export type UseSubscriptions = ReturnType<typeof useSubscriptions>;

export default useSubscriptions;
