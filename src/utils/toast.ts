import { toast, type ToastOptions } from 'react-hot-toast';
export const showToast = {
  success: (message: string, options?: ToastOptions) => toast.success(message, options),
  error: (message: string, options?: ToastOptions) => toast.error(message, options),
  loading: (message: string, options?: ToastOptions) => toast.loading(message, options),
  dismiss: (id?: string) => toast.dismiss(id),
};