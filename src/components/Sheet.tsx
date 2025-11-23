import BottomSheet from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { useTheme } from '@src/hooks/useTheme';
import { ReactNode, useEffect, useRef } from 'react';
import { BackHandler, TouchableWithoutFeedback, View } from 'react-native';

// ----------------------------------------------------------------------

export function Sheet({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: VoidFunction;
}) {
  const theme = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // ----------------------------------------------------------------------

  const handleBack = () => {
    onClose();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  return (
    <>
      <Portal>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: theme.palette.background.backdrop,
            }}
          />
        </TouchableWithoutFeedback>
      </Portal>

      <Portal>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={['80%']}
            backgroundStyle={{
              backgroundColor: theme.palette.background.paper,
            }}
            handleIndicatorStyle={{
              backgroundColor: theme.palette.background.elevated,
              width: 60,
            }}
            enablePanDownToClose
            onClose={onClose}
          >
            {children}
          </BottomSheet>
        </View>
      </Portal>
    </>
  );
}
