import { View } from 'react-native';

// ----------------------------------------------------------------------

type Props = {
  size?: number;
  direction?: 'vertical' | 'horizontal';
};

// ----------------------------------------------------------------------

export function Gap({ size = 12, direction = 'vertical' }: Props) {
  return (
    <View style={{ [direction === 'vertical' ? 'height' : 'width']: size }} />
  );
}
