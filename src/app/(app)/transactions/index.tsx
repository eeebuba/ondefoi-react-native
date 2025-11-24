import { IconButton } from '@src/components/default';
import { useTheme } from '@src/hooks/useTheme';
import { TransactionList } from '@src/modules/transactions/TransactionList';
import { router } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ----------------------------------------------------------------------

export default function TransactionsPage() {
  return (
    <View style={{ flex: 1 }}>
      <TransactionList />

      <Footer />
    </View>
  );
}

// ----------------------------------------------------------------------

function Footer() {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <IconButton
        name="home"
        onPress={() => router.navigate('/home')}
        color={theme.palette.text.faded}
      />

      <IconButton
        name="sync"
        onPress={() => router.navigate('/transactions')}
        color={theme.palette.text.primary}
      />
    </SafeAreaView>
  );
}
