import { ITransaction } from '@src/@types/transaction';
import { Text } from '@src/components/default';
import { useTheme } from '@src/hooks/useTheme';
import { fCurrency } from '@src/utils/formatNumber';
import { View } from 'react-native';

// ----------------------------------------------------------------------

type Props = {
  transactions: ITransaction[];
};

// ----------------------------------------------------------------------

export function MonthSummary({ transactions }: Props) {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  const summary = transactions.reduce(
    (accumulator, item) => {
      if (item.type === 'exit') {
        return {
          ...accumulator,
          exit: accumulator.exit + item.value,
        };
      }
      return {
        ...accumulator,
        entry: accumulator.entry + item.value,
      };
    },
    { exit: 0, entry: 0 },
  );

  // ----------------------------------------------------------------------

  return (
    <View
      style={{
        backgroundColor: theme.palette.background.paper,
        height: 80,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <SideText label="ganhos" value={fCurrency(summary.entry)} />

      <CenterText
        label="resultado"
        value={fCurrency(summary.entry - summary.exit)}
      />

      <SideText label="despesas" value={'-' + fCurrency(summary.exit)} />
    </View>
  );
}

// ----------------------------------------------------------------------

type LabelProps = {
  label: string;
  value: string;
};

function CenterText({ label, value }: LabelProps) {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Text
        variant="h4"
        style={{
          textAlign: 'center',
          fontWeight: theme.font.weights.medium,
        }}
      >
        {label}
      </Text>
      <Text
        variant="h2"
        style={{
          textAlign: 'center',
          fontWeight: theme.font.weights.bold,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function SideText({ label, value }: LabelProps) {
  const theme = useTheme();

  const color =
    label === 'ganhos' ? theme.palette.primary.main : theme.palette.error.main;

  return (
    <View style={{ flex: 1 }}>
      <Text
        variant="h4"
        style={{
          textAlign: 'center',
          fontWeight: theme.font.weights.medium,
        }}
      >
        {label}
      </Text>
      <Text
        variant="h3"
        style={{
          textAlign: 'center',
          fontWeight: theme.font.weights.bold,
          color: color,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
