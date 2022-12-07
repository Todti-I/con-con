import { AddIcon, Button, IButtonProps } from 'native-base';

const AddIngredientsButton = (props: IButtonProps) => (
  <Button
    mx={4}
    px={4}
    alignSelf="flex-start"
    variant="ghost"
    colorScheme="tertiary"
    borderRadius={8}
    rightIcon={<AddIcon />}
    _text={{ fontWeight: '500' }}
    {...props}
  />
);

export default AddIngredientsButton;
