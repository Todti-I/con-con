import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './hooks/useAppContext';
import Screens from './screens';
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
        <AppProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar backgroundColor="white" />
            <Screens />
          </GestureHandlerRootView>
        </AppProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
