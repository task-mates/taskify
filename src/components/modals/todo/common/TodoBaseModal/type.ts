import { ReactNode } from 'react';
export interface TodoBaseModalProps {
  onClose: () => void;
  title: string;
  labelId: string;
  badgeArea?: ReactNode;
  actionMenu?: ReactNode;
  children: ReactNode;
}
