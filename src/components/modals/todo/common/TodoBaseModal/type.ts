import { ReactNode } from 'react';

export type HeaderVariant = 'default' | 'card';
export interface TodoBaseModalProps {
  onClose: () => void;
  title: string;
  labelId: string;
  badgeGroup?: ReactNode;
  actionMenu?: ReactNode;
  children: ReactNode;
  headerVariant?: HeaderVariant;
}
