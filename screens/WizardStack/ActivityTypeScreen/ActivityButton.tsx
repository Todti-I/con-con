import { Box, Button, IButtonProps, IIconProps } from 'native-base';

type Props = {
  colorScheme: string;
  isActive?: boolean;
  Icon: (props: IIconProps) => JSX.Element;
} & IButtonProps;

const ActivityButton = ({ colorScheme, isActive, Icon, ...props }: Props) => (
  <Box>
    <Button
      h="48px"
      colorScheme={colorScheme}
      variant={isActive ? 'solid' : 'outline'}
      _text={{ fontWeight: 500 }}
      {...props}
    />
    <Icon
      color={isActive ? 'text.50' : 'text.900'}
      position="absolute"
      left={3}
      top={3}
      size={6}
    />
  </Box>
);

export default ActivityButton;
