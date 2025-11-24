import { Container, Icon, IconButton, Text } from '@src/components/default';
import { useAuth } from '@src/hooks/useAuth';
import { useTheme } from '@src/hooks/useTheme';
import { useTransactions } from '@src/hooks/useTransactions';
import { fCurrency } from '@src/utils/formatNumber';
import { filterTransactionsByMonth } from '@src/utils/transactions';
import { router } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <Container spacing="large" style={{ flex: 1 }}>
        <SummaryCard />
      </Container>

      <Footer />
    </View>
  );
}

// ----------------------------------------------------------------------

function Header() {
  const theme = useTheme();
  const { signOut, user } = useAuth();

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          display: 'flex',
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.text.disabled,
        }}
      >
        <Icon name="profile" size={48} color={theme.palette.text.faded} />
      </View>

      <View
        style={{ flexShrink: 1, marginRight: 'auto', paddingHorizontal: 16 }}
      >
        <Text variant="h4" style={{ color: theme.palette.text.faded }}>
          Olá,
        </Text>
        <Text variant="h3" numberOfLines={1}>
          {user ? user.nickname : '-'}
        </Text>
      </View>

      <IconButton
        name="logout"
        onPress={() => void signOut()}
        color={theme.palette.text.faded}
      />
    </SafeAreaView>
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
        color={theme.palette.text.primary}
      />

      <IconButton
        name="sync"
        onPress={() => router.navigate('/transactions')}
        color={theme.palette.text.faded}
      />
    </SafeAreaView>
  );
}

// ----------------------------------------------------------------------

function SummaryCard() {
  const theme = useTheme();
  const { rawTransactions } = useTransactions();

  const getCurrentMonthResult = () => {
    const currentMonthTransactions = filterTransactionsByMonth(
      rawTransactions,
      new Date(),
    );

    const currentMonthResult = currentMonthTransactions.reduce(
      (accumulator, transaction) => {
        if (transaction.type === 'entry') {
          return accumulator + transaction.value;
        } else {
          return accumulator - transaction.value;
        }
      },
      0,
    );

    return currentMonthResult;
  };

  return (
    <View
      style={{
        padding: 22,
        display: 'flex',
        borderRadius: theme.props.borderRadius.card,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Text
        variant="h4"
        style={{
          color: theme.palette.text.secondary,
          fontWeight: theme.font.weights.medium,
        }}
      >
        Resultado do mês
      </Text>

      <Text variant="h1" style={{ marginTop: 6 }}>
        R$ {fCurrency(getCurrentMonthResult()) || '-,--'}
      </Text>
    </View>
  );
}
