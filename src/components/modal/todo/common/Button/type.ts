import type { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}
