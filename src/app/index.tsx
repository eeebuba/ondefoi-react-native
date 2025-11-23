import { useAuth } from '@src/hooks/useAuth';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View } from 'react-native';

// ----------------------------------------------------------------------

export default function Page() {
  const { isLoading, isLogged } = useAuth();

  const onLayoutRootView = useCallback(() => {
    if (!isLoading) void SplashScreen.hideAsync();
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      {isLogged ? <Redirect href="/home" /> : <Redirect href="/auth/sign-in" />}
    </View>
  );
}
