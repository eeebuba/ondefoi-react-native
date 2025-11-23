import { View, ViewProps } from 'react-native';

// ----------------------------------------------------------------------

type Props = {
  spacing?: 'medium' | 'large';
  insets?: ('T' | 'B' | 'L' | 'R')[];
} & ViewProps;

// ----------------------------------------------------------------------

export function Container({
  spacing = 'medium',
  insets = ['T', 'L', 'R'],
  style,
  ...rest
}: Props) {
  const pT = insets.includes('T');
  const pB = insets.includes('B');
  const pL = insets.includes('L');
  const pR = insets.includes('R');

  return (
    <View
      style={[
        {
          ...(pT && { paddingTop: spacing === 'medium' ? 20 : 32 }),
          ...(pB && { paddingBottom: spacing === 'medium' ? 20 : 32 }),
          ...(pL && { paddingLeft: spacing === 'medium' ? 20 : 32 }),
          ...(pR && { paddingRight: spacing === 'medium' ? 20 : 32 }),
        },
        style,
      ]}
    >
      {rest.children}
    </View>
  );
}
