import { ExpoConfig } from 'expo/config';

// ----------------------------------------------------------------------

// REPRESENTATIVE VERSION - as shown in the app
export const VERSION = '2.0.1';
// EAS UPDATE TARGET - do not change the patch version
const RUNTIME_VERSION = '2.0.1';

/* both versions must have the same major and minor number */

//

// increase this number by 1 when you need to generate a new build
export const BUILD_NUMBER: number = 3;

const IOS_BUILD: string = String(BUILD_NUMBER);
const ANDROID_BUILD: number = BUILD_NUMBER;

// ----------------------------------------------------------------------

export default (): { expo: ExpoConfig } => {
  return {
    expo: {
      name: 'OndeFoi?',
      slug: 'finances',
      scheme: 'finances',
      owner: 'ebuba',
      version: RUNTIME_VERSION,
      newArchEnabled: true,
      orientation: 'portrait',
      userInterfaceStyle: 'dark',
      icon: './assets/icon.png',
      platforms: ['ios', 'android'],
      splash: {
        image: './assets/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#121214',
      },
      ios: {
        bundleIdentifier: 'com.ebuba.finances',
        buildNumber: IOS_BUILD,
        supportsTablet: true,
        config: {
          usesNonExemptEncryption: false,
        },
      },
      android: {
        package: 'com.ebuba.finances',
        versionCode: ANDROID_BUILD,
        edgeToEdgeEnabled: true,
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#121214',
        },
      },
      runtimeVersion: RUNTIME_VERSION,
      updates: {
        url: 'https://u.expo.dev/c5191e1b-29f2-4c9e-85d0-9f5e2e9d4f99',
        fallbackToCacheTimeout: 0,
        checkAutomatically: 'ON_LOAD',
      },
      extra: {
        eas: {
          projectId: 'c5191e1b-29f2-4c9e-85d0-9f5e2e9d4f99',
        },
      },
      plugins: [['expo-router'], ['expo-font']],
    },
  };
};
