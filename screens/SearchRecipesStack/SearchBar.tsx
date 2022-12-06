import { useDebounce } from 'con-con/hooks';
import {
  ArrowBackIcon,
  CloseIcon,
  HStack,
  IconButton,
  Input,
  SearchIcon,
} from 'native-base';
import { ReactNode, useState } from 'react';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

type Props = {
  withDebounce?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onBack?: () => void;
  extraButtons?: ReactNode;
  placeholder?: string;
};

const SearchBar = ({
  withDebounce,
  defaultValue,
  onChange,
  onBlur,
  onBack,
  extraButtons,
  placeholder,
}: Props) => {
  const debounce = useDebounce(250);
  const [value, setValue] = useState(defaultValue || '');

  const handleChange = (value: string) => {
    if (withDebounce) {
      debounce.set(() => onChange?.(value));
    } else {
      onChange?.(value);
    }

    setValue(value);
  };

  const handleClear = () => {
    onChange?.('');
    setValue('');
  };

  return (
    <HStack w={width - 32} space={2} alignItems="center">
      {onBack && (
        <IconButton
          borderRadius="full"
          icon={<ArrowBackIcon />}
          colorScheme="light"
          onPress={onBack}
        />
      )}
      <Input
        h="36px"
        flex={1}
        bg="text.50"
        leftElement={<SearchIcon ml={4} size={4} />}
        rightElement={
          value ? (
            <IconButton
              borderRadius="full"
              colorScheme="gray"
              onPress={handleClear}
              icon={<CloseIcon color="text.500" size={4} />}
            />
          ) : undefined
        }
        borderRadius="full"
        fontSize="md"
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
      />
      {extraButtons}
    </HStack>
  );
};

export default SearchBar;
