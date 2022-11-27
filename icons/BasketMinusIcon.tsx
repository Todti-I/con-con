import { Icon, IIconProps } from 'native-base';
import { ClipPath, Defs, G, Path } from 'react-native-svg';

export default (props: IIconProps) => (
  <Icon size={4} fill="none" viewBox="0 0 24 24" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M23.365 22.095 1.905.635l-1.27 1.27 4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38a1.997 1.997 0 0 0 1.16 3.62c.67 0 1.26-.33 1.62-.84l2.84 2.84 1.27-1.27Zm-15.31-7.73c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2h-5.04Zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49a1.003 1.003 0 0 0-.88-1.48H7.175l9.01 9Zm-8.55 5c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2Z"
        fill="currentColor"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Icon>
);