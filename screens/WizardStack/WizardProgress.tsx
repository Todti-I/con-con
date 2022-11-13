import useForceUpdate from 'con-con/hooks/useForceUpdate';
import { Box, Progress } from 'native-base';
import { memo, useEffect } from 'react';
import { useWizardContext } from './wizard-context';

const WizardProgress = () => {
  const forceUpdate = useForceUpdate();
  const { pageNumber, subscriptions } = useWizardContext();

  useEffect(() => {
    const key = subscriptions.subscribe('progress', forceUpdate);

    return () => {
      subscriptions.unsubscribe(key);
    };
  }, []);

  return (
    <Box
      left={0}
      top="54px"
      position="absolute"
      px={4}
      w="full"
      opacity={pageNumber.get === 0 ? 0 : 1}
    >
      <Progress h="20px" value={pageNumber.get} max={8} />
    </Box>
  );
};

export default memo(WizardProgress);
