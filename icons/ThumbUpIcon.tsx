import { Icon, IIconProps } from 'native-base';
import { Path } from 'react-native-svg';

export default (props: IIconProps) => (
  <Icon size={4} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M5 9v12H1V9h4Zm4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21H9Zm0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03V19Z"
      fill="currentColor"
    />
  </Icon>
);
