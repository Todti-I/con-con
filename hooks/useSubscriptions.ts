import { useMemo, useRef } from 'react';

const useSubscriptions = () => {
  const generateId = useRef(0);
  const subscriptions = useRef(new Map<string, Map<number, () => void>>());

  return useMemo(() => {
    const subscribe = (key: string, action: () => void) => {
      if (!subscriptions.current.has(key)) {
        subscriptions.current.set(key, new Map());
      }
      const subscribeId = generateId.current++;
      subscriptions.current.get(key)?.set(subscribeId, action);

      return () => {
        subscriptions.current.get(key)?.delete(subscribeId);
      };
    };

    const ping = (key: string) => {
      subscriptions.current.get(key)?.forEach((action) => action());
    };

    return {
      subscribe,
      ping,
    };
  }, []);
};

export type UseSubscriptions = ReturnType<typeof useSubscriptions>;

export default useSubscriptions;
