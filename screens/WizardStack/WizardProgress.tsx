import { useForceUpdate } from 'con-con/hooks';
import { Box, Progress } from 'native-base';
import { memo, useEffect } from 'react';
import { useWizardContext } from './wizard-context';

const WizardProgress = () => {
  const forceUpdate = useForceUpdate();
  const { pageNumber, subscriptions } = useWizardContext();

  useEffect(() => {
    const unsubscribe = subscriptions.subscribe('progress', forceUpdate);

    return () => unsubscribe();
  }, []);

  return (
    <Box
      left={0}
      top="30px"
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
