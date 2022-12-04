import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasketButton from 'con-con/components/BasketButton';
import { useValue } from 'con-con/hooks';
import MultiHeartsIcon from 'con-con/icons/MultiHeartsIcon';
import { RecipesStackParamList } from 'con-con/types/navigation';
import { Box, HStack, IconButton, SearchIcon } from 'native-base';
import { memo, useLayoutEffect, useState } from 'react';
import SearchBar from './SearchBar';

type Props = {
  navigation: NativeStackNavigationProp<RecipesStackParamList, 'CookBook'>;
  onSearch?: (value: string) => void;
};

const CookBookHeader = ({ navigation, onSearch }: Props) => {
  const [isActivitySearch, setIsActivitySearch] = useState(false);
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
            <IconButton
              borderRadius="full"
              icon={<SearchIcon />}
              colorScheme="light"
              onPress={() => setIsActivitySearch((isActivity) => !isActivity)}
            />
            <IconButton
              borderRadius="full"
              icon={<MultiHeartsIcon />}
              colorScheme="light"
              onPress={() => navigation.navigate('FavoriteRecipes')}
            />
            <BasketButton navigateToBasket={navigation.navigate} />
          </HStack>
        ),
      });
    }
  }, [navigation.getId(), isActivitySearch]);

  return null;
};

export default CookBookHeader;
