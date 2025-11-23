import { theme } from '@src/theme';
import { View, ViewProps } from 'react-native';
import { Icon } from './Icon';
import { Text } from './Text';

// ----------------------------------------------------------------------

type Props = {
  variant?: 'error' | 'warning' | 'info' | 'success';
} & ViewProps;

// ----------------------------------------------------------------------

export function Alert({ variant = 'error', ...rest }: Props) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.props.padding.element,
        backgroundColor: theme.palette.error.dark,
        borderRadius: theme.props.borderRadius.element,
      }}
    >
      <Icon name={variant} />
      <Text
        variant="subtitle1"
        style={{ marginLeft: theme.props.padding.element }}
      >
        {rest.children}
      </Text>
    </View>
  );
}
