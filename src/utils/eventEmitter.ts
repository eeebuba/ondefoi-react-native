import mitt from 'mitt';
import { ToastData } from 'src/components/toast';

// ----------------------------------------------------------------------

type Events = {
  toast: ToastData;
  toastDismiss: undefined;
};

// ----------------------------------------------------------------------

export const eventEmitter = mitt<Events>();
