import LogoSlogan from '@src/assets/logo/logo_slogan.svg';
import { View, ViewProps } from 'react-native';

// ----------------------------------------------------------------------

type Props = {
  variant?: 'slogan';
} & ViewProps;

// ----------------------------------------------------------------------

export function Logo({ variant = 'slogan', style, ...rest }: Props) {
  if (variant === 'slogan') {
    return (
      <View {...rest} style={[{ height: 70 }, style]}>
        <LogoSlogan
          width={'100%'}
          height={'100%'}
          viewBox={'0 0 508.12 169.8'}
        />
      </View>
    );
  }

  return (
    <View {...rest} style={[{ height: 70 }, style]}>
      <LogoSlogan width={'100%'} height={'100%'} viewBox={'0 0 508.12 169.8'} />
    </View>
  );
}
