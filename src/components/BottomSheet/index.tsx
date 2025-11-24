import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import { LucideIcon } from '../LucideIcon';
import { Typography } from '../Typography';

// ----------------------------------------------------------------------

export function useBottomSheet({
  onOpen,
  onClose,
  onDismiss,
}: {
  onOpen?: () => void;
  onClose?: () => void;
  onDismiss?: () => void;
} = {}): {
  ref: React.RefObject<BottomSheetModal | null>;
  open: () => void;
  close: () => void;
  dismiss: () => void;
  isOpen: boolean;
} {
  const ref = useRef<BottomSheetModal>(null);

  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    setTimeout(() => {
      ref.current?.present();
      ref.current?.expand();
      onOpen?.();
    }, 0);
  };

  const dismiss = () => {
    Keyboard.dismiss();
    ref.current?.dismiss();
    setIsOpen(false);
    onDismiss?.();
  };

  const close = () => {
    Keyboard.dismiss();
    ref.current?.close();
    setIsOpen(false);
    onClose?.();
  };

  return { ref, open, close, dismiss, isOpen };
}

// ----------------------------------------------------------------------

export function BottomSheet({
  ref,
  isOpen,
  fullHeight,
  stackBehavior,
  onDismiss,
  children,
}: {
  ref?: React.RefObject<BottomSheetModal | null>;
  isOpen?: boolean;
  fullHeight?: boolean;
  stackBehavior?: 'push' | 'replace' | 'switch';
  onDismiss?: () => void;
  children: React.ReactNode;
}) {
  const animationConfigs = useBottomSheetTimingConfigs({ duration: 500 });

  if (!isOpen) return null;

  return (
    <BottomSheetModal
      ref={ref}
      stackBehavior={stackBehavior}
      handleComponent={null}
      enablePanDownToClose={false}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      onDismiss={onDismiss}
      {...(fullHeight && {
        snapPoints: ['70%'],
        enableDynamicSizing: false,
      })}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          // pressBehavior="none"
        />
      )}
      animationConfigs={animationConfigs}
      backgroundStyle={{ backgroundColor: '#121214' }}
    >
      {children}
    </BottomSheetModal>
  );
}

// ----------------------------------------------------------------------

export function BottomSheetHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        paddingHorizontal: 12,
        gap: 16,
      }}
    >
      <View style={{ width: 36, height: 36 }} />

      <Typography
        style={{
          fontSize: 15,
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>

      <Pressable
        onPress={onClose}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
        }}
      >
        <LucideIcon icon="Close" />
      </Pressable>
    </View>
  );
}
