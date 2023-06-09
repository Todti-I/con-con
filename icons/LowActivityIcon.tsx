import { Icon, IIconProps } from 'native-base';
import { Path } from 'react-native-svg';

export default (props: IIconProps) => (
  <Icon size={4} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M12 1a2 2 0 0 0-2 2c0 1.11.89 2 2 2 1.11 0 2-.89 2-2a2 2 0 0 0-2-2Zm-2 5c-.27 0-.5.11-.69.28H9.3L4 11.59 5.42 13 9 9.41V22h2v-7h2v7h2V9.41L18.58 13 20 11.59l-5.3-5.31c-.2-.17-.43-.28-.7-.28"
      fill="currentColor"
    />
  </Icon>
);
