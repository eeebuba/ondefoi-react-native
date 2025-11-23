import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { ToastProvider } from '@src/components/toast';
import { AuthProvider } from '@src/contexts/AuthContext';
import { ThemeProvider } from '@src/theme/ThemeProvider';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ----------------------------------------------------------------------

void SplashScreen.preventAutoHideAsync();

// ----------------------------------------------------------------------

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PortalProvider>
          <ThemeProvider>
            <ToastProvider>
              <AuthProvider>
                <BottomSheetModalProvider>
                  <StatusBar style="light" />

                  <Stack
                    screenOptions={{
                      headerShown: false,
                      contentStyle: { backgroundColor: '#121214' },
                    }}
                  />
                </BottomSheetModalProvider>
              </AuthProvider>
            </ToastProvider>
          </ThemeProvider>
        </PortalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
