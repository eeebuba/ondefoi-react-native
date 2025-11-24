import { useAuth } from '@src/hooks/useAuth';
import { Redirect } from 'expo-router';
import { View } from 'react-native';

// ----------------------------------------------------------------------

export default function Page() {
  const { isLoading, isLogged } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {isLogged ? <Redirect href="/home" /> : <Redirect href="/auth/sign-in" />}
    </View>
  );
}
