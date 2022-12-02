import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import { RecipesStackParamList } from 'con-con/types/navigation';
import { Box, HStack } from 'native-base';
import { useLayoutEffect } from 'react';

const useCookBookHeader = (
  navigation: NativeStackNavigationProp<RecipesStackParamList, 'CookBook'>
) => {
  // const [isSearchActive, setSearchActive] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Box ml={4} />,
      headerTitle: 'Рецепты',
      headerRight: () => {
        return (
          <HStack>
            <BasketButton navigateToBasket={navigation.navigate} />
          </HStack>
        );
      },
    });
  }, [navigation]);

  return {};
};

export default useCookBookHeader;
