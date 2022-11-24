import { Icon, IIconProps } from 'native-base';
import { Path } from 'react-native-svg';

export default (props: IIconProps) => (
  <Icon size={4} fill="none" viewBox="0 0 98 98" {...props}>
    <Path
      d="M49 8.166c22.458 0 40.833 18.375 40.833 40.834 0 22.458-18.375 40.833-40.833 40.833S8.167 71.458 8.167 49C8.167 26.54 26.542 8.166 49 8.166Zm0 8.167c-7.758 0-14.7 2.45-20.008 6.942l45.733 45.733C78.808 63.292 81.667 56.35 81.667 49c0-17.967-14.7-32.667-32.667-32.667Zm20.008 58.392L23.275 28.992C18.783 34.3 16.333 41.242 16.333 49c0 17.966 14.7 32.666 32.667 32.666 7.758 0 14.7-2.45 20.008-6.941Z"
      fill="currentColor"
    />
  </Icon>
);