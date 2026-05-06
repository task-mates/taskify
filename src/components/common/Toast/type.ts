export interface ToastProps {
  message: string;
  confirmText?: string;
  onConfirm?: () => void;
  onClose: () => void;
}