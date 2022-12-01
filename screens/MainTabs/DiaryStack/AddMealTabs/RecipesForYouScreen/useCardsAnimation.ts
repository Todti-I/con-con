import { useValue } from 'con-con/hooks';
import { Animated, Easing } from 'react-native';

const useCardsAnimation = () => {
  const animation = useValue(new Animated.Value(0));
  const lockControl = useValue(false);

  const startAnimation = (onEndAnimation?: () => void) => {
    lockControl.set(true);

    Animated.timing(animation.get, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
      delay: 50,
    }).start();

    setTimeout(() => {
      animation.get.setValue(0);
      lockControl.set(false);
      onEndAnimation?.();
    }, 450);
  };

  const translateY_1 = animation.get.interpolate({
    inputRange: [0, 1],
    outputRange: [-75, 0],
  });

  const scale_1 = animation.get.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const fade_1 = animation.get.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const translateX_2 = animation.get.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -600],
  });

  const scale_2 = animation.get.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });

  const fade_2 = animation.get.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return {
    lockControl,
    startAnimation,
    backCardAnimationStyles: {
      opacity: fade_1,
      transform: [{ scale: scale_1 }, { translateY: translateY_1 }],
    },
    topCardAnimationStyles: {
      opacity: fade_2,
      transform: [{ scale: scale_2 }, { translateX: translateX_2 }],
    },
  };
};

export default useCardsAnimation;
