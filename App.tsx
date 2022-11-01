import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import MainTabsScreen from './screens/MainTabsScreen';

const App = () => (
  <NativeBaseProvider>
    <NavigationContainer>
      <MainTabsScreen />
    </NavigationContainer>
  </NativeBaseProvider>
);

export default App;
