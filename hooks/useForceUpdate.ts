import { useCallback, useState } from 'react';

const useForceUpdate = () => {
  const [_, setCount] = useState(0);

  const forceUpdate = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return forceUpdate;
};

export default useForceUpdate;
