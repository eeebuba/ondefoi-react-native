import { theme } from '@src/theme';
import { useEffect, useState } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
  Easing,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from './Icon';
import { Text } from './Text';

// ----------------------------------------------------------------------

type Props = {
  icon: string;
  label: string;
  extended: boolean;
  onPress: VoidFunction;
} & PressableProps;

// ----------------------------------------------------------------------

export function Fab({ icon, label, extended, onPress, ...rest }: Props) {
  const bgIdle = theme.palette.background.elevated;
  const bgActive = theme.palette.background.neutral;

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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.props.padding.element,
    borderRadius: theme.props.borderRadius.card,
    //
    backgroundColor: backgroundColor.value,
  }));

  // ----------------------------------------------------------------------

  const labelRef = useAnimatedRef<Animated.View>();

  const [labelStartMaxWidth, setLabelStartMaxWidth] = useState(0); // 10 * label.length

  const labelMaxWidth = useSharedValue(labelStartMaxWidth);

  const extendIn = () => {
    labelMaxWidth.value = withTiming(labelStartMaxWidth, {
      duration: 100,
      easing: Easing.ease,
    });
  };
  const extendOut = () => {
    labelMaxWidth.value = withTiming(0, { duration: 100, easing: Easing.ease });
  };

  const animatedLabelStyle = useAnimatedStyle(() => ({
    maxWidth: labelMaxWidth.value,
  }));

  useEffect(() => {
    if (extended) {
      extendIn();
    } else {
      extendOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extended, labelStartMaxWidth]);

  // useEffect(() => {
  //   runOnUI(() => {
  //     'worklet';
  //     console.log('MEASURE: ', measure(labelRef));
  //   })();
  // }, [labelRef]);

  // ----------------------------------------------------------------------

  return (
    <Pressable
      onPress={onPress}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      {...rest}
    >
      <Animated.View style={[animatedStyle]}>
        <Icon name={icon} size="large" />

        <Animated.View style={[animatedLabelStyle]} ref={labelRef}>
          <Text
            variant="subtitle1"
            numberOfLines={1}
            ellipsizeMode={'clip'}
            style={{ paddingLeft: theme.props.padding.element }}
          >
            {label}
          </Text>
        </Animated.View>

        <Text
          variant="subtitle1"
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={{
            paddingLeft: theme.props.padding.element,
            height: 0,
            position: 'absolute',
          }}
          onLayout={({
            nativeEvent: {
              layout: { width },
            },
          }) => {
            setLabelStartMaxWidth(width);
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
