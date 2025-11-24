import { TransactionsProvider } from '@src/contexts/TransactionsContext';
import { useAuth } from '@src/hooks/useAuth';
import { Redirect, Stack } from 'expo-router';

// ----------------------------------------------------------------------

export default function Layout() {
  const { isLoading, isLogged } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isLogged) {
    return <Redirect href="/auth/sign-in" />;
  }

  return (
    <TransactionsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#121214' },
        }}
      />
    </TransactionsProvider>
  );
}
