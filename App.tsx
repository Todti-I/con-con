import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
// import MainTabsScreen from './screens/MainTabsScreen';
import { useFonts } from 'expo-font';
import WizardStack from './screens/WizardStack';
import theme from './theme';

const App = () => {
  const [loaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {/* <MainTabsScreen /> */}
        <WizardStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
