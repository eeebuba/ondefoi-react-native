import { theme } from '@src/theme';
import { alpha } from '@src/utils/theme';
import { Pressable, PressableProps, ViewProps } from 'react-native';
import Animated, {
  AnimatedProps,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from './Icon';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  onPress: VoidFunction;
  color?: string;
  size?: number | 'small' | 'medium' | 'large';
  selected?: boolean;
} & Omit<PressableProps, 'style'> &
  { style?: AnimatedProps<ViewProps> }['style'];

// ----------------------------------------------------------------------

export function IconButton({
  name,
  onPress,
  color,
  size,
  selected = false,
  style,
  ...rest
}: Props) {
  const bgIdle = selected
    ? theme.palette.background.paper
    : alpha(theme.palette.text.faded, 0);
  const bgActive = selected
    ? theme.palette.background.neutral
    : alpha(theme.palette.text.faded, 0.12);

  const backgroundColor = useSharedValue(bgIdle);

  const fadeIn = () => {
    backgroundColor.value = withTiming(bgActive, {
      duration: 100,
      easing: Easing.ease,
    });
  };

  const fadeOut = () => {
    backgroundColor.value = withTiming(bgIdle, {
      duration: 200,
      easing: Easing.ease,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    padding: 8,
    display: 'flex',
    borderRadius: 100,
    alignItems: 'center',
    //
    backgroundColor: backgroundColor.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      {...rest}
    >
      <Animated.View style={[animatedStyle, style]}>
        <Icon name={name} color={color} size={size} />
      </Animated.View>
    </Pressable>
  );
}
