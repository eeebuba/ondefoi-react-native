import { ViewProps } from 'react-native';
import Animated, {
  FadingTransition,
  FadeOut,
  FadeIn,
} from 'react-native-reanimated';

// ----------------------------------------------------------------------

export const Fade = {
  View: ({ ...rest }: ViewProps) => {
    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        layout={FadingTransition}
        {...rest}
      >
        {rest.children}
      </Animated.View>
    );
  },
};
