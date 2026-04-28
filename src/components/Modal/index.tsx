'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '@/src/hooks/useScrollLock';
import { ModalProps } from './type';
import * as S from './styles';

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Modal({
  onClose,
  children,
  labelledById,
  overlayVariant = 'default',
}: ModalProps) {
  const [mounted, setMounted] = useState(false); // [추가]

  useScrollLock();

  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    setMounted(true); // [추가]
  }, []);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!mounted) return; // [추가]

    const previouslyFocused = document.activeElement as HTMLElement;
    const focusable =
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
    focusable?.[0]?.focus();
    return () => {
      previouslyFocused?.focus();
    };
  }, [mounted]); //[수정]

  useEffect(() => {
    if (!mounted) return; // [추가] mounted 전에는 document 사용 X

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable =
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mounted]); //[수정]

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!mounted) return null; // [추가]

  return createPortal(
    <S.Overlay onClick={handleOverlayClick} $overlayVariant={overlayVariant}>
      <S.DialogContainer
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
      >
        {children}
      </S.DialogContainer>
    </S.Overlay>,
    document.body
  );
}
