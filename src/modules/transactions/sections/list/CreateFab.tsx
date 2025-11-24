import { BottomSheet, useBottomSheet } from '@src/components/BottomSheet';
import { Fab } from '@src/components/default';
import { TransactionCreateEdit } from '../../TransactionCreateEdit';

// ----------------------------------------------------------------------

export function CreateFab({ isExtended }: { isExtended: boolean }) {
  const {
    ref: modalRef,
    isOpen: isOpen,
    open: open,
    close: close,
  } = useBottomSheet();

  return (
    <>
      <Fab
        icon="add"
        label="Adicionar"
        extended={isExtended}
        onPress={open}
        style={{
          right: 16,
          bottom: 16,
          position: 'absolute',
          zIndex: 100,
        }}
      />

      <BottomSheet
        ref={modalRef}
        stackBehavior="push"
        fullHeight
        isOpen={isOpen}
        onDismiss={() => close()}
      >
        <TransactionCreateEdit />
      </BottomSheet>
    </>
  );
}
