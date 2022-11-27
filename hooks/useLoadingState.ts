import { useState } from 'react';
import useCancelOnUnmount from './useCancelOnUnmount';

const useLoadingState = (defaultIsLoading = false) => {
  const cancelOnUnmount = useCancelOnUnmount();
  const [isLoading, setIsLoading] = useState(defaultIsLoading);

  const trackLoading = async (
    method: () => Promise<void> | void,
    options?: {
      isHiddenLoading?: boolean;
      onCatch?: (error: unknown) => void;
      onFinally?: () => void;
    }
  ) => {
    try {
      !options?.isHiddenLoading && cancelOnUnmount(() => setIsLoading(true));
      await method();
    } catch (error) {
      options?.onCatch?.(error);
      console.error(error);
    } finally {
      options?.onFinally?.();
      !options?.isHiddenLoading && cancelOnUnmount(() => setIsLoading(false));
    }
  };

  return {
    isLoading,
    setIsLoading,
    trackLoading,
  };
};

export default useLoadingState;
