import OutlineHeartIcon from 'con-con/icons/OutlineHeartIcon';
import SolidHeartIcon from 'con-con/icons/SolidHeartIcon';
import { IconButton, IIconButtonProps } from 'native-base';
import { useState } from 'react';
import { GestureResponderEvent } from 'react-native';

type Props = {
  defaultIsChecked?: boolean;
} & IIconButtonProps;

const HeartButton = ({ defaultIsChecked, onPress, ...props }: Props) => {
  const [isChecked, setIsChecked] = useState(defaultIsChecked || false);

  const Icon = isChecked ? SolidHeartIcon : OutlineHeartIcon;

  const handlePress = (e: GestureResponderEvent) => {
    setIsChecked((isChecked) => !isChecked);
    onPress?.(e);
  };

  return (
    <IconButton
      {...props}
      colorScheme="red"
      borderRadius="full"
      icon={<Icon />}
      onPress={handlePress}
    />
  );
};

export default HeartButton;
