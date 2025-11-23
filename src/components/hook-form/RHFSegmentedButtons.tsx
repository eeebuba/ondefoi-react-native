import { Gap, Icon, Text } from '@src/components/default';
import { theme } from '@src/theme';
import { alpha } from '@src/utils/theme';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Pressable, View, ViewProps } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// ----------------------------------------------------------------------

type TButton = {
  value: string;
  label: string;
  icon: string;
};

type Props = {
  name: string;
  buttons: TButton[];
  disabled?: boolean;
} & ViewProps;

// ----------------------------------------------------------------------

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function RHFSegmentedButtons({
  name,
  buttons,
  disabled,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <View
          {...other}
          style={{
            height: 56,
            padding: 4,
            display: 'flex',
            flexDirection: 'row',
            borderRadius: theme.props.borderRadius.element,
            backgroundColor: theme.palette.background.neutral,
          }}
        >
          {buttons.map((_button, index) => (
            <ButtonRender
              key={index}
              _button={_button}
              index={index}
              disabled={disabled}
              value={value as string}
              onChange={onChange}
            />
          ))}
        </View>
      )}
    />
  );
}

function ButtonRender({
  _button,
  index,
  value,
  disabled,
  onChange,
}: {
  _button: TButton;
  index: number;
  disabled: boolean | undefined;
  value: string;
  onChange: (value: string) => void;
}) {
  const bgIdle = alpha(theme.palette.text.faded, 0);
  const bgActive = alpha(theme.palette.text.faded, 0.12);

  const backgroundColor = useSharedValue(
    _button.value === value ? bgActive : bgIdle,
  );

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
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.props.borderRadius.element,
    //
    backgroundColor: backgroundColor.value,
    //
    ...(index !== 0 && { marginLeft: 4 }),
  }));

  useEffect(() => {
    if (value === _button.value) {
      fadeIn();
    } else {
      fadeOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <AnimatedPressable
      key={_button.value}
      onPress={() => {
        onChange(_button.value);
      }}
      disabled={disabled}
      style={[animatedStyle]}
    >
      <Icon
        name={_button.icon}
        {...(disabled && { color: theme.palette.text.faded })}
      />

      <Gap direction="horizontal" size={6} />

      <Text
        variant="subtitle1"
        style={{
          ...(disabled && { color: theme.palette.text.faded }),
        }}
      >
        {_button.label}
      </Text>
    </AnimatedPressable>
  );
}
