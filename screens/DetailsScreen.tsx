import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Text, View } from 'react-native';
import { TabParamList } from './types';

const DetailsScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<TabParamList, 'Details'>) => {
  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Set params"
        onPress={() =>
          navigation.setParams({ otherParam: 'example setParams' })
        }
      />
    </View>
  );
};

export default DetailsScreen;
