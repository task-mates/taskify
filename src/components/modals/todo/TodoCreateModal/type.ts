export interface TodoCreateModalProps {
  onClose: () => void;
  onCreated?: () => void;
  dashboardId: number;
  columnId: number;
}
