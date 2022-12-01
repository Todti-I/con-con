import { useValue } from 'con-con/hooks';
import BasketMinusIcon from 'con-con/icons/BasketMinusIcon';
import BasketPlusIcon from 'con-con/icons/BasketPlusIcon';
import TrashIcon from 'con-con/icons/TrashIcon';
import BasketProductData from 'con-con/types/basket-product-data';
import { Box, Center, CheckIcon, HStack, Text, VStack } from 'native-base';
import { memo, useState } from 'react';
import { Animated, Easing } from 'react-native';
import {
  Swipeable,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';

type Props = {
  item: BasketProductData;
  onCheck?: (id: string, isChecked: boolean) => void;
  onRemove?: (id: string) => void;
};

const ProductCard = ({ item, onCheck, onRemove }: Props) => {
  const [isChecked, setIsChecked] = useState(item.isChecked);
  const removalAnimation = useValue(new Animated.Value(0));

  const handleCheck = () => {
    onCheck?.(item.id, !isChecked);
    setIsChecked(!isChecked);
  };

  const handleRemove = () => {
    onRemove?.(item.id);

    Animated.timing(removalAnimation.get, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
      delay: 300,
    }).start();
  };

  const renderLeftActions = () => (
    <Animated.View style={{ flex: 1 }}>
      <Box display="flex" flex={1} alignItems="flex-end" bg="red.600">
        <TrashIcon mx={6} my={5} size={6} color="white" />
      </Box>
    </Animated.View>
  );

  const maxHeightAnimation = removalAnimation.get.interpolate({
    inputRange: [0, 1],
    outputRange: [64, 0],
  });

  const marginBottomAnimation = removalAnimation.get.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });

  return (
    <Animated.View
      style={{
        overflow: 'hidden',
        marginBottom: marginBottomAnimation,
        maxHeight: maxHeightAnimation,
      }}
    >
      <Swipeable
        containerStyle={{ borderRadius: 8, height: 64 }}
        renderRightActions={renderLeftActions}
        onSwipeableWillOpen={handleRemove}
      >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#C4B5FD', false)}
          onPress={handleCheck}
        >
          <HStack
            px={3}
            h="full"
            space={2}
            bg="white"
            alignItems="center"
            borderRadius={8}
          >
            <Center
              mx="15px"
              boxSize="18px"
              bg={isChecked ? 'violet.600' : 'white'}
              borderWidth={isChecked ? '0' : '1px'}
              borderStyle="solid"
              borderColor="text.500"
              borderRadius={2}
              children={<CheckIcon color="white" />}
            />
            <VStack flex={1}>
              <Text
                color="text.900"
                fontWeight={500}
                fontSize="md"
                children={item.name}
              />
              <Text
                color="text.500"
                fontWeight={500}
                fontSize="sm"
                children={item.grams > 0 ? `${item.grams} г` : ''}
              />
            </VStack>
            {isChecked ? (
              <BasketMinusIcon m={3} size={6} color="violet.600" />
            ) : (
              <BasketPlusIcon m={3} size={6} color="violet.600" />
            )}
          </HStack>
        </TouchableNativeFeedback>
      </Swipeable>
    </Animated.View>
  );
};

export default memo(ProductCard, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});
