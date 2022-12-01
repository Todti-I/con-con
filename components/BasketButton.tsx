import BasketIcon from 'con-con/icons/BasketIcon';
import { IconButton } from 'native-base';

type Props = {
  navigateToBasket: (name: 'Basket') => void;
};

const BasketButton = ({ navigateToBasket }: Props) => (
  <IconButton
    colorScheme="light"
    borderRadius="full"
    icon={<BasketIcon />}
    onPress={() => navigateToBasket('Basket')}
  />
);

export default BasketButton;
