import { Icon, IIconProps } from 'native-base';
import { Path } from 'react-native-svg';

export default (props: IIconProps) => (
  <Icon size={4} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      d="M2 4H0v14c0 1.1.9 2 2 2h14v-2H2V4Zm16-4H6C4.9 0 4 .9 4 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 14H6V2h12v12ZM8 7h8v2H8V7Zm0 3h4v2H8v-2Zm0-6h8v2H8V4Z"
      fill="currentColor"
    />
  </Icon>
);
