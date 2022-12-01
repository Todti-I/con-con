import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import { Box, HStack } from 'native-base';
import { useLayoutEffect } from 'react';
import { RecipesStackParamList } from '../types';

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
