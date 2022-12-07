import { Box, IBoxProps, Text } from 'native-base';
import { memo, useState } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

type Props = {
  defaultChosen?: boolean;
  name: string;
  onChoose?: (isChosen: boolean) => void;
} & IBoxProps;

const IngredientCard = ({ defaultChosen, name, onChoose, ...props }: Props) => {
  const [isChosen, setIsChosen] = useState(defaultChosen || false);

  const handleChoose = () => {
    onChoose?.(!isChosen);
    setIsChosen(!isChosen);
  };

  return (
    <Box borderRadius={8} overflow="hidden" {...props}>
      <TouchableNativeFeedback onPress={handleChoose}>
        <Text
          px={4}
          py={3}
          bg={isChosen ? 'tertiary.200' : 'white'}
          fontSize="md"
          fontWeight="500"
          children={name}
        />
      </TouchableNativeFeedback>
    </Box>
  );
};

export default memo(IngredientCard, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name;
});
