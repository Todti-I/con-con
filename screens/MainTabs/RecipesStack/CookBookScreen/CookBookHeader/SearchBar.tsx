import {
  ArrowBackIcon,
  HStack,
  IconButton,
  Input,
  SearchIcon,
} from 'native-base';
import { useState } from 'react';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

type Props = {
  defaultValue?: string;
  onSearch?: (value: string) => void;
  onBack?: () => void;
};

const SearchBar = ({ defaultValue, onSearch, onBack }: Props) => {
  const [value, setValue] = useState(defaultValue || '');

  const handleSearch = () => {
    onSearch?.(value);
  };

  return (
    <HStack w={width - 32} space={2} alignItems="center">
      <IconButton
        borderRadius="full"
        icon={<ArrowBackIcon />}
        colorScheme="light"
        onPress={onBack}
      />
      <Input
        h="36px"
        flex={1}
        bg="text.50"
        leftElement={<SearchIcon ml={4} size={4} />}
        borderRadius="full"
        fontSize="md"
        placeholder="Поиск по рецептам"
        defaultValue={defaultValue}
        onBlur={handleSearch}
        onChangeText={setValue}
      />
    </HStack>
  );
};

export default SearchBar;
