import { Icon, IIconProps } from 'native-base';
import { Path } from 'react-native-svg';

export default (props: IIconProps) => (
  <Icon size={4} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M12.5 1.5c-1.77 0-3.33 1.17-3.83 2.87C8.14 4.13 7.58 4 7 4a4 4 0 0 0-4 4 4.01 4.01 0 0 0 3 3.87V19h13v-7.13c1.76-.46 3-2.05 3-3.87a4 4 0 0 0-4-4c-.58 0-1.14.13-1.67.37-.5-1.7-2.06-2.87-3.83-2.87Zm-.5 9h1v7h-1v-7Zm-3 2h1v5H9v-5Zm6 0h1v5h-1v-5ZM6 20v1a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-1H6Z"
      fill="currentColor"
    />
  </Icon>
);
