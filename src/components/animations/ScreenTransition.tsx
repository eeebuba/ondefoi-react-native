import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

// ----------------------------------------------------------------------

export const addTransition = (
  Screen: (props: { children: React.ReactNode }) => React.ReactNode,
) => {
  return (props: { children: React.ReactNode }) => (
    <ScreenTransition>{Screen(props)}</ScreenTransition>
  );
};

// ----------------------------------------------------------------------

export const ScreenTransition = (props: { children: React.ReactNode }) => {
  const opacity = useSharedValue(0);

  useFocusEffect(() => {
    opacity.value = withTiming(1, { duration: 250, easing: Easing.linear });

    return () => {
      opacity.value = withTiming(0, { duration: 250, easing: Easing.linear });
    };
  });

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    //
    opacity: opacity.value,
  }));

  // ----------------------------------------------------------------------

  return (
    <Animated.View style={[animatedStyle]}>{props.children}</Animated.View>
  );
};
