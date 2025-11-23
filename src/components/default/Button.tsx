import { theme } from '@src/theme';
import {
  ActivityIndicator,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Text } from './Text';

// ----------------------------------------------------------------------

type Props = {
  variant?: 'contained' | 'text';
  loading?: boolean;
  textStyle?: TextProps['style'];
} & TouchableOpacityProps;

// ----------------------------------------------------------------------

export function Button({
  variant = 'contained',
  loading = false,
  textStyle,
  style,
  ...rest
}: Props) {
  // variant: text
  if (variant === 'text') {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        {...rest}
        style={[
          {
            display: 'flex',
            padding: theme.props.padding.element,
            alignItems: 'center',
          },
          style,
        ]}
      >
        <Text variant="button2" style={textStyle}>
          {rest.children}
        </Text>
      </TouchableOpacity>
    );
  }

  // variant: contained
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}
      style={[
        {
          height: 56,
          padding: 16,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.props.borderRadius.element,
          backgroundColor: theme.palette.background.elevated,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={theme.palette.text.primary} />
      ) : (
        <Text variant="button1" style={textStyle}>
          {rest.children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
