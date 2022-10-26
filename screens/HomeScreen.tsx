import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { Button, Stack, Text } from 'native-base';
import { TabParamList } from './types';

const HomeScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<TabParamList, 'Home'>) => {
  return (
    <Stack
      flex={1}
      backgroundColor="#fff"
      alignItems="center"
      justifyContent="center"
      space="10px"
    >
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
        children="Go to Details"
      />
      <Button
        children="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text>Post: {route.params?.post}</Text>
    </Stack>
  );
};

export default HomeScreen;
