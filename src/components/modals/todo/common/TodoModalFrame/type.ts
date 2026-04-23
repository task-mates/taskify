import { ReactNode } from 'react';
export interface TodoModalFrameProps {
  onClose: () => void;
  title: string;
  labelId: string;
  badgeArea?: ReactNode;
  actionMenu?: ReactNode;
  children: ReactNode;
}
