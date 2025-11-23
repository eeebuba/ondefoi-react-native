import { theme } from '@src/theme';
import { Text as NText, TextProps } from 'react-native';

// ----------------------------------------------------------------------

type Props = {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'button1'
    | 'button2';
} & TextProps;

// ----------------------------------------------------------------------

const _variants = {
  h1: {
    fontSize: 24,
    fontWeight: theme.font.weights.bold,
  },
  h2: {
    fontSize: 20,
    fontWeight: theme.font.weights.bold,
  },
  h3: {
    fontSize: 17,
    fontWeight: theme.font.weights.bold,
  },
  h4: {
    fontSize: 15,
    fontWeight: theme.font.weights.bold,
  },
  subtitle1: {
    fontSize: 15,
    fontWeight: theme.font.weights.medium,
  },
  subtitle2: {
    fontSize: 12,
    fontWeight: theme.font.weights.medium,
  },
  body1: {
    fontSize: 15,
    fontWeight: theme.font.weights.regular,
  },
  body2: {
    fontSize: 12,
    fontWeight: theme.font.weights.regular,
  },

  //

  button1: {
    fontSize: 14,
    fontWeight: theme.font.weights.bold,
  },
  button2: {
    fontSize: 14,
    fontWeight: theme.font.weights.regular,
  },
};

// ----------------------------------------------------------------------

export function Text({ variant, style, ...rest }: Props) {
  return (
    <NText
      {...rest}
      style={[
        {
          color: theme.palette.text.primary,
          ..._variants[variant],
        },
        style,
      ]}
    >
      {rest.children}
    </NText>
  );
}
