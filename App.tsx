import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
// import MainTabsScreen from './screens/MainTabsScreen';
import WizardStack from './screens/WizardScreen/WizardScreen';

const App = () => (
  <NativeBaseProvider>
    <NavigationContainer>
      {/* <MainTabsScreen /> */}
      <WizardStack />
    </NavigationContainer>
  </NativeBaseProvider>
);

export default App;
