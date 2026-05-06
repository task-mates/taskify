import type { Dashboard } from '@/src/apis/dashboards/type';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  dashboards: Dashboard[];
  isLoading: boolean;
  isError: boolean;
}
