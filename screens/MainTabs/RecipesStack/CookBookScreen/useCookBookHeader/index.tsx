import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import { useValue } from 'con-con/hooks';
import MultiHeartsIcon from 'con-con/icons/MultiHeartsIcon';
import { RecipesStackParamList } from 'con-con/types/navigation';
import { Box, HStack, IconButton, SearchIcon } from 'native-base';
import { useLayoutEffect, useState } from 'react';
import SearchBar from './SearchBar';

type UseCookBookHeader = {
  navigation: NativeStackNavigationProp<RecipesStackParamList, 'CookBook'>;
  onSearch?: (value: string) => void;
};

const useCookBookHeader = ({ navigation, onSearch }: UseCookBookHeader) => {
  const [isActivitySearch, setIsActivitySearch] = useState(false);
  const [isOnlyFavorites, setIsOnlyFavorites] = useState(false);
  const searchValue = useValue<string>('', { onUpdate: onSearch });

  useLayoutEffect(() => {
    if (isActivitySearch) {
      navigation.setOptions({
        headerTitle: () => (
          <SearchBar
            defaultValue={searchValue.get}
            onSearch={searchValue.set}
            onBack={() => setIsActivitySearch(false)}
          />
        ),
        headerLeft: () => null,
        headerRight: () => null,
      });
    } else {
      navigation.setOptions({
        headerTitle: 'Рецепты',
        headerLeft: () => <Box ml={4} />,
        headerRight: () => (
          <HStack space={2}>
            {!isOnlyFavorites && (
              <IconButton
                borderRadius="full"
                icon={<SearchIcon />}
                colorScheme={isOnlyFavorites ? 'red' : 'light'}
                onPress={() => setIsActivitySearch((isActivity) => !isActivity)}
              />
            )}
            <IconButton
              borderRadius="full"
              icon={<MultiHeartsIcon />}
              colorScheme={isOnlyFavorites ? 'red' : 'light'}
              onPress={() => setIsOnlyFavorites((isOnly) => !isOnly)}
            />
            <BasketButton navigateToBasket={navigation.navigate} />
          </HStack>
        ),
      });
    }
  }, [navigation, isOnlyFavorites, isActivitySearch]);

  return { isOnlyFavorites, isActivitySearch };
};

export default useCookBookHeader;
