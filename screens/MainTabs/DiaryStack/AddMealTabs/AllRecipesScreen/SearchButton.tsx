import { IconButton, IIconButtonProps, SearchIcon } from 'native-base';

const SearchButton = (props: IIconButtonProps) => (
  <IconButton
    bottom={4}
    right={4}
    position="absolute"
    shadow="2"
    boxSize={12}
    variant="solid"
    borderRadius="full"
    icon={<SearchIcon />}
    {...props}
  />
);

export default SearchButton;
