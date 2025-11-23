import { Text, TextProps } from 'react-native';

// ----------------------------------------------------------------------
// https://www.reactnativeschool.com/fix-react-native-text-cutoff-on-oneplus-oppo-devices

export function Typography({ children, ...rest }: TextProps) {
  return <Text {...rest}>{children}</Text>;
}
