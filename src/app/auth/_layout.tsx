import { useAuth } from '@src/hooks/useAuth';
import { Redirect, Stack } from 'expo-router';

// ----------------------------------------------------------------------

export default function Layout() {
  const { isLoading, isLogged } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isLogged) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#121214' },
      }}
    />
  );
}
