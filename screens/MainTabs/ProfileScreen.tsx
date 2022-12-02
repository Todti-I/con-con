import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ProfileIcon from 'con-con/icons/ProfileIcon';
import { MainTabParamList } from 'con-con/types/navigation';
import { Box, Text } from 'native-base';

const ProfileScreen = (
  props: BottomTabScreenProps<MainTabParamList, 'Profile'>
) => (
  <Box flex={1} bg="#F7F7F7" alignItems="center" justifyContent="center">
    <Text>ProfileScreen</Text>
  </Box>
);

ProfileScreen.screenName = 'Profile' as const;
ProfileScreen.title = 'Профиль';
ProfileScreen.Icon = ProfileIcon;

export default ProfileScreen;
