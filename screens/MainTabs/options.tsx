import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import BasketIcon from 'con-con/icons/BasketIcon';
import MediumActivityIcon from 'con-con/icons/MediumActivityIcon';
import { HStack, IconButton } from 'native-base';

type NavigateMethods = {
  goToBasket: () => void;
  goToWizard: () => void;
};

export const headerOptions = ({
  goToBasket,
  goToWizard,
}: NavigateMethods): BottomTabNavigationOptions => ({
  headerStyle: {
    backgroundColor: 'white',
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
  },
  headerTitleAlign: 'left',
  headerTitleStyle: {
    fontWeight: '600',
    fontSize: 20,
  },
  headerTitleContainerStyle: {
    marginLeft: 32,
  },
  headerRight: () => (
    <HStack>
      <IconButton
        colorScheme="light"
        icon={<MediumActivityIcon />}
        onPress={goToWizard}
      />
      <IconButton
        colorScheme="light"
        icon={<BasketIcon />}
        onPress={goToBasket}
      />
    </HStack>
  ),
  headerRightContainerStyle: {
    marginRight: 8,
  },
});

export const tabBarOptions: BottomTabNavigationOptions = {
  tabBarInactiveTintColor: '#5F6368',
  tabBarActiveTintColor: '#1A73E8',
  tabBarStyle: {
    height: 56,
    backgroundColor: 'white',
  },
  tabBarItemStyle: {
    paddingVertical: 8,
  },
  tabBarLabelStyle: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
  },
};
