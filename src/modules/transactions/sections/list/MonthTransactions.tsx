import { ITransaction } from '@src/@types/transaction';
import { BottomSheet, useBottomSheet } from '@src/components/BottomSheet';
import { Fade } from '@src/components/animations/Fade';
import {
  Container,
  Gap,
  Icon,
  IconButton,
  Text,
} from '@src/components/default';
import { useTheme } from '@src/hooks/useTheme';
import { fCurrency } from '@src/utils/formatNumber';
import { alpha } from '@src/utils/theme';
import { TTransactionByDate } from '@src/utils/transactions';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TransactionCreateEdit } from '../../TransactionCreateEdit';
import { CreateFab } from './CreateFab';

// ----------------------------------------------------------------------

type Props = {
  transactions: TTransactionByDate[];
};

// ----------------------------------------------------------------------

export function MonthTransactions({ transactions }: Props) {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  const [isFabExtended, setIsFabExtended] = useState(true);

  const [transactionEditData, setTransactionEditData] =
    useState<ITransaction>();

  const {
    ref: modalRef,
    isOpen: isOpen,
    open: open,
    close: close,
  } = useBottomSheet();

  // ----------------------------------------------------------------------

  return (
    <>
      {!!transactions.length && (
        <ScrollView
          onScroll={(event) => {
            const currentScrollPosition =
              Math.floor(event.nativeEvent.contentOffset.y) ?? 0;
            setIsFabExtended(currentScrollPosition <= 0);
          }}
        >
          <Container>
            <View style={{ marginBottom: 70 }}>
              {transactions.map((transactionsGroup) => (
                <Fade.View key={transactionsGroup.date}>
                  <Text
                    variant="subtitle1"
                    style={{
                      marginBottom: 8,
                      color: theme.palette.text.faded,
                    }}
                  >
                    {transactionsGroup.label}
                  </Text>

                  {transactionsGroup.transactions.map((transaction) => {
                    const isExit = transaction.type === 'exit';

                    return (
                      <View
                        key={transaction.id}
                        style={{
                          padding: 8,
                          marginBottom: 8,
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'row',
                          borderRadius: theme.props.borderRadius.card,
                          backgroundColor: theme.palette.background.card,
                        }}
                      >
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            display: 'flex',
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isExit
                              ? alpha(theme.palette.error.main, 0.12)
                              : alpha(theme.palette.primary.main, 0.12),
                          }}
                        >
                          <Icon
                            name={isExit ? 'made' : 'received'}
                            size="large"
                            color={
                              isExit
                                ? theme.palette.error.main
                                : theme.palette.primary.main
                            }
                          />
                        </View>

                        <View
                          style={{
                            flexGrow: 1,
                            paddingHorizontal: theme.props.padding.element,
                          }}
                        >
                          <Text
                            variant="h4"
                            style={{ color: theme.palette.text.secondary }}
                          >
                            {transaction.description}
                          </Text>
                          <Text
                            variant="subtitle1"
                            style={{ color: theme.palette.text.faded }}
                          >
                            {'R$ ' + fCurrency(transaction.value)}
                          </Text>
                        </View>

                        <IconButton
                          name="edit"
                          size="small"
                          onPress={() => {
                            setTransactionEditData(transaction);
                            open();
                          }}
                        />
                      </View>
                    );
                  })}

                  <Gap />
                </Fade.View>
              ))}
            </View>
          </Container>
        </ScrollView>
      )}

      {!transactions.length && (
        <Fade.View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            variant="subtitle1"
            style={{ textAlign: 'center' }}
          >{`Nenhum registro\nno período selecionado`}</Text>
        </Fade.View>
      )}

      <CreateFab isExtended={isFabExtended} />

      <BottomSheet
        ref={modalRef}
        stackBehavior="push"
        fullHeight
        isOpen={isOpen}
        onDismiss={() => close()}
      >
        <TransactionCreateEdit
          onSuccess={() => close()}
          isEdit
          editData={transactionEditData}
        />
      </BottomSheet>
    </>
  );
}
