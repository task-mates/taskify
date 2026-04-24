import { ReactNode } from 'react';

export type ModalVariant = 'default' | 'full';

export interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  labelledById?: string;
  variant?: ModalVariant;
}
