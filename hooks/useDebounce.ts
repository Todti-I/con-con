import { useCallback } from 'react';
import useValue from './useValue';

function useDebounce(debounceTime: number) {
  const timeoutMap = useValue<Map<string, NodeJS.Timeout>>(new Map());

  const reset = useCallback((key = 'default') => {
    const timeout = timeoutMap.get.get(key);
    if (timeout) {
      clearTimeout(timeout);
      timeoutMap.get.delete(key);
    }
  }, []);

  const set = useCallback((callback: () => void, key = 'default') => {
    reset(key);
    timeoutMap.get.set(key, setTimeout(callback, debounceTime));
  }, []);

  return {
    set,
    reset,
  };
}

export default useDebounce;
