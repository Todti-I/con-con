import { Icon, IIconProps } from 'native-base';
import { Path } from 'react-native-svg';

export default (props: IIconProps) => (
  <Icon size={4} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2ZM9 4h2v5l-1-.75L9 9V4Zm9 16H6V4h1v9l3-2.25L13 13V4h5v16Z"
      fill="currentColor"
    />
  </Icon>
);
