import { Icon, IIconProps } from 'native-base';
import { ClipPath, Defs, G, Path } from 'react-native-svg';

export default (props: IIconProps) => (
  <Icon size={4} fill="none" viewBox="0 0 32 32" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M26.667 4h-1.334V1.333h-2.666V4H9.333V1.333H6.667V4H5.333a2.675 2.675 0 0 0-2.666 2.667V28c0 1.467 1.2 2.667 2.666 2.667h21.334c1.466 0 2.666-1.2 2.666-2.667V6.667C29.333 5.2 28.133 4 26.667 4Zm0 24H5.333V10.667h21.334V28Z"
        fill="currentColor"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Icon>
);
