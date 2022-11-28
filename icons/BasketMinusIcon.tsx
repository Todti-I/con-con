import { Icon, IIconProps } from 'native-base';
import { ClipPath, Defs, G, Path } from 'react-native-svg';

export default (props: IIconProps) => (
  <Icon size={4} fill="none" viewBox="0 0 24 24" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M5.93 20.5c0-1.1.89-2 1.99-2s2 .9 2 2-.9 2-2 2-1.99-.9-1.99-2zM15.93 20.5c0-1.1.89-2 1.99-2s2 1 2 2c0 1.1-.9 2-2 2s-1.99-.9-1.99-2zM13.09 13.5H9.02l-1.1 2h7.17l2 2H7.92c-1.52 0-2.48-1.63-1.75-2.97l1.35-2.44-3.745-7.905L13.09 13.5z"
        fill="currentColor"
      />
        <Path
        d="M1 1.41L2.41 0l21.46 21.46-1.41 1.41L1 1.41zM20.565 3.435H7.685l2 2h9.19l-2.76 5h-1.44l1.94 1.94c.54-.14.99-.49 1.25-.97l3.58-6.49c.37-.66-.12-1.48-.88-1.48z"
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
