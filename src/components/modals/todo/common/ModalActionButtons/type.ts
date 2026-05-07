export interface ModalActionButtonsProps {
  submitText: string;
  onCancel: () => void;
  cancelText?: string;
  formId?: string;
  submitDisabled?: boolean;
}
