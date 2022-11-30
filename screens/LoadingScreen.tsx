import Logo from 'con-con/components/Logo';
import { Center, Spinner, Text, VStack } from 'native-base';

const LoadingScreen = () => (
  <Center flex={1} justifyContent="space-evenly">
    <Logo />
    <VStack space={6}>
      <Spinner size="lg" />
      <Text
        fontSize="lg"
        fontWeight="500"
        fontFamily=""
        children="Загрузка..."
      />
    </VStack>
  </Center>
);

export default LoadingScreen;
