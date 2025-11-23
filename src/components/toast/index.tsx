import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { eventEmitter } from '@src/utils/eventEmitter';
import { LucideIcon } from '../LucideIcon';
import { Typography } from '../Typography';
import { theme } from '@src/theme';

// ----------------------------------------------------------------------

type ToastMessage = string;

type ToastType = 'success' | 'error' | 'info' | 'warning';

type ToastOptions = {
  id?: number | string;
  dismissible?: boolean;
  duration?: number;
  onDismiss?: () => void;
  onAutoClose?: () => void;
};

export type ToastData = {
  type: ToastType;
  message: ToastMessage;
  options: ToastOptions;
};

export const toast: {
  success: (message: ToastMessage, data?: ToastOptions) => void;
  error: (message: ToastMessage, data?: ToastOptions) => void;
  info: (message: ToastMessage, data?: ToastOptions) => void;
  warning: (message: ToastMessage, data?: ToastOptions) => void;
  //
  dismiss: () => void;
} = {
  success: (message, data) =>
    eventEmitter.emit('toast', {
      type: 'success',
      message,
      options: data || {},
    }),
  error: (message, data) =>
    eventEmitter.emit('toast', { type: 'error', message, options: data || {} }),
  info: (message, data) =>
    eventEmitter.emit('toast', { type: 'info', message, options: data || {} }),
  warning: (message, data) =>
    eventEmitter.emit('toast', {
      type: 'warning',
      message,
      options: data || {},
    }),
  //
  dismiss: () => eventEmitter.emit('toastDismiss'),
};

// ----------------------------------------------------------------------

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  const pushToast = useCallback((data: ToastData) => {
    setToast(data);
    setIsVisible(true);
  }, []);

  const removeToast = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setToast(null), 400);
  }, []);

  useEffect(() => {
    eventEmitter.on('toast', pushToast);
    return () => {
      eventEmitter.off('toast');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}

      <View
        pointerEvents={isVisible ? 'auto' : 'none'}
        style={{
          position: 'absolute',
          width: '100%',
          top: 0,
          padding: 12,
          paddingTop: insets.top + 6,
          zIndex: 99999,
        }}
      >
        {!!toast && (
          <Toast
            key={JSON.stringify(toast)}
            data={toast}
            removeToast={removeToast}
          />
        )}
      </View>
    </>
  );
}

// ----------------------------------------------------------------------

const CONFIG: {
  [key in ToastData['type']]: { color: string | undefined };
} = {
  info: {
    color: theme.palette.primary.main,
  },
  warning: {
    color: theme.palette.error.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.primary.main,
  },
};

// ----------------------------------------------------------------------

export function Toast({
  data,
  removeToast,
}: {
  data: ToastData;
  removeToast: () => void;
}) {
  const {
    type,
    message,
    options: { dismissible = true, duration = 4000, onDismiss, onAutoClose },
  } = data;

  const onClose = useCallback(() => {
    removeToast();
    onDismiss?.();
  }, [removeToast, onDismiss]);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast();
      onAutoClose?.();
    }, duration);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        overflow: 'hidden',
        borderRadius: theme.props.borderRadius.element,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          gap: 12,
        }}
      >
        <Typography style={{ flex: 1, paddingLeft: 8 }}>{message}</Typography>

        {dismissible && (
          <TouchableOpacity onPress={onClose}>
            <LucideIcon icon="Close" />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 8,
          height: '100%',
          backgroundColor: CONFIG[type].color,
        }}
      />
    </View>
  );
}
