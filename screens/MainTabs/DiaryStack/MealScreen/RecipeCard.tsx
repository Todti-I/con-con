import { useValue } from 'con-con/hooks';
import SolidPlusIcon from 'con-con/icons/SolidPlusIcon';
import { Box, IconButton, Text } from 'native-base';
import { memo } from 'react';
import { Animated, Easing, TouchableNativeFeedback } from 'react-native';
import { Recipe } from '../types';

type Props = {
  recipe: Recipe;
  onRemove?: (recipeId: string) => void;
};

const RecipeCard = ({ recipe, onRemove }: Props) => {
  const removalAnimation = useValue(new Animated.Value(0));

  const handleRemove = () => {
    onRemove?.(recipe.id);

    Animated.timing(removalAnimation.get, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
      delay: 200,
    }).start();
  };

  const maxHeightAnimation = removalAnimation.get.interpolate({
    inputRange: [0, 1],
    outputRange: [64, 0],
  });

  const marginTopAnimation = removalAnimation.get.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 0],
  });

  return (
    <Animated.View
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: marginTopAnimation,
        maxHeight: maxHeightAnimation,
      }}
    >
      <Box position="relative" h="64px" bg="white">
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#C4B5FD', false)}
          // onPress={goToMealScreen} // TODO редирект на рецепт
        >
          <Box pl={4} pr={16} py="11px" flex={1}>
            <Text
              numberOfLines={1}
              fontWeight="500"
              fontSize="md"
              children={recipe.title}
            />
            <Text
              color="text.500"
              fontSize="sm"
              fontWeight="500"
              children={`${recipe.kilocalories} ккал`}
            />
          </Box>
        </TouchableNativeFeedback>
        <IconButton
          top={2}
          right={3}
          boxSize={12}
          position="absolute"
          colorScheme="violet"
          onPress={handleRemove}
          icon={
            <SolidPlusIcon
              size={6}
              style={{ transform: [{ rotate: '45deg' }] }}
            />
          }
        />
      </Box>
    </Animated.View>
  );
};

export default memo(RecipeCard, (prevProps, nextProps) => {
  return prevProps.recipe.id === nextProps.recipe.id;
});
