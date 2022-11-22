import { Icon, IIconProps } from 'native-base';
import { Path } from 'react-native-svg';

export default (props: IIconProps) => (
  <Icon size={4} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      d="M8 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Zm0 9c2.7 0 5.8 1.29 6 2v1H2v-.99C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4Z"
      fill="currentColor"
    />
  </Icon>
);
