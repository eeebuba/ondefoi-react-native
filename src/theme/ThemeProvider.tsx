import { theme } from '@src/theme';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

void NavigationBar.setBackgroundColorAsync(theme.palette.background.default);

// ----------------------------------------------------------------------

export function ThemeProvider({ ...rest }: { children: ReactNode }) {
  return (
    <>
      <StatusBar style="light" />
      {rest.children}
    </>
  );
}
