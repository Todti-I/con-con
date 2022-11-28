import { AddIcon, Button, IButtonProps } from 'native-base';

const AddMealButton = (props: IButtonProps) => (
  <Button
    borderRadius={8}
    borderColor="primary.600"
    variant="outline"
    _text={{ fontWeight: 500 }}
    leftIcon={<AddIcon mr={4} />}
    children="Добавить ещё продукты"
    {...props}
  />
);

export default AddMealButton;
