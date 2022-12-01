import { IInputProps, Input, SearchIcon } from 'native-base';
import { useState } from 'react';

type Props = {
  onSearch?: (value: string) => void;
} & IInputProps;

const RecipeSearch = ({ onSearch, ...props }: Props) => {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    onSearch?.(value);
  };

  return (
    <Input
      h="40px"
      bg="text.50"
      leftElement={<SearchIcon ml={4} size={4} />}
      borderRadius="full"
      fontSize="md"
      placeholder="Поиск по рецептам"
      onBlur={handleSearch}
      onChangeText={setValue}
      {...props}
    />
  );
};

export default RecipeSearch;
