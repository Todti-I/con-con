import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import useAppContext from 'con-con/hooks/useAppContext';
import { Box, Button, Text } from 'native-base';
import { TabParamList } from './types';

const DiaryScreen = (props: BottomTabScreenProps<TabParamList, 'Diary'>) => {
  const { isWizardComplete, forceUpdate } = useAppContext();

  const handleResetWizard = () => {
    isWizardComplete.set(false);
    forceUpdate();
  };

  return (
    <Box
      flex={1}
      backgroundColor="#fff"
      alignItems="center"
      justifyContent="center"
    >
      <Text>DiaryScreen</Text>
      <Button mt={10} onPress={handleResetWizard} children="Reset wizard" />
    </Box>
  );
};

DiaryScreen.screenName = 'Diary' as const;
DiaryScreen.title = 'Дневник';

export default DiaryScreen;
