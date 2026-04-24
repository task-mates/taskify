import { ReactNode } from 'react';

export interface TodoCardModalProps {
  onClose: () => void;
  children: ReactNode;
}
