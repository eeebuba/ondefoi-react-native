import icons from '@src/assets/icons';
import { theme } from '@src/theme';
import { View, ViewProps } from 'react-native';

// ----------------------------------------------------------------------

const defaultProps = {
  width: '100%',
  height: '100%',
  viewBox: '0 0 48 48',
};

// ----------------------------------------------------------------------

type Props = {
  name: string;
  color?: string;
  size?: number | 'small' | 'medium' | 'large';
} & ViewProps;

export function Icon({
  name,
  color = theme.palette.text.secondary,
  size = 'medium',
  ...rest
}: Props) {
  const Svg = icons[name];

  const _size =
    (typeof size === 'number' && size) ||
    (size === 'small' && 24) ||
    (size === 'medium' && 28) ||
    32;

  return (
    <View style={{ height: _size, width: _size }} {...rest}>
      <Svg {...defaultProps} fill={color} />
    </View>
  );
}
