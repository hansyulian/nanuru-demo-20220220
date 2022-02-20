import { CustomError } from 'CustomTypes';
import { toast, ToastOptions } from 'react-toastify';

export function showToast(message: string, options: ToastOptions = {}) {
  toast(message, {
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    ...options,
  });
}

export function showError(
  reason: string | Error | CustomError,
  options: ToastOptions = {}
) {
  let message = `Unknown error: ${reason.toString()}`;
  if (typeof reason === 'string') {
    message = reason;
  }
  if (reason instanceof Error) {
    message = reason.message;
  }
  if ((reason as CustomError).type) {
    message = (reason as CustomError).type;
  }
  toast.error(message, {
    ...options,
  });
}

export function showSuccess(message: string, options: ToastOptions = {}) {
  toast.success(message, {
    ...options,
  });
}

export function showInfo(message: string, options: ToastOptions = {}) {
  toast.info(message, {
    ...options,
  });
}
