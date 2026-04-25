import type { ModalVariant } from '@/src/components/Modal/type';

export type HeaderVariant = 'default' | 'card';

export interface TodoBaseModalProps {
  onClose: () => void;
  title: string;
  labelId: string;
  badgeGroup?: React.ReactNode;
  actionMenu?: React.ReactNode;
  children: React.ReactNode;
  headerVariant?: HeaderVariant;

  overlayVariant?: ModalVariant; // 추가
}
