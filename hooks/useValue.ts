import { useMemo, useRef } from 'react';

export type ValueRef<T> = {
  readonly get: T;
  set: (newValue: T) => void;
};

const useValue = <T>(defaultValue: T): ValueRef<T> => {
  const value = useRef<T>(defaultValue);

  const valueRef: ValueRef<T> = useMemo(
    () => ({
      get get(): T {
        return value.current;
      },
      set: (newValue: T) => {
        value.current = newValue;
      },
    }),
    []
  );

  return valueRef;
};

export default useValue;
