import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

export const tabBarOptions: MaterialTopTabNavigationOptions = {
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
  },
  tabBarActiveTintColor: '#0891B2',
  tabBarInactiveTintColor: '#737373',
  tabBarPressColor: '#0891B2',
  tabBarIndicatorStyle: {
    height: 3,
    backgroundColor: '#0891B2',
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
  },
};
