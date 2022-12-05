import { AddIcon, Button, IButtonProps } from 'native-base';

const AddIngredientsButton = (props: IButtonProps) => (
  <Button
    mx={4}
    w="180px"
    variant="ghost"
    colorScheme="tertiary"
    borderRadius={8}
    rightIcon={<AddIcon />}
    _text={{ fontWeight: '500' }}
    children="Добавить продукт"
    {...props}
  />
);

export default AddIngredientsButton;
