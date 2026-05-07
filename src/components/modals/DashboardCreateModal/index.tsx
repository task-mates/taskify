'use client';
import { useState } from 'react';
import Modal from '@/src/components/Modal';
import CloseIcon from '@/src/components/icons/icon-close.svg';
import Input from '@/src/components/common/Input';
import Button from '@/src/components/common/Button';
import { createDashboard } from '@/src/apis/dashboards';
import { showToast } from '@/src/utils/toast';
import { emitDashboardChanged } from '@/src/utils/dashboardListEvent';
import { PROFILE_COLORS } from '@/src/styles/profileColor';
import * as S from './style';
import type { DashboardCreateModalProps } from './type';

export default function DashboardCreateModal({
  onClose,
}: DashboardCreateModalProps) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !color) return;
    setIsLoading(true);
    try {
      await createDashboard({ title: title.trim(), color });
      showToast.success('대시보드가 생성되었습니다.');
      emitDashboardChanged();
      onClose();
    } catch {
      showToast.error('대시보드 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} labelledById="dashboard-create-modal-title">
      <S.Container>
        <S.Header>
          <S.Title id="dashboard-create-modal-title">새 대시보드 생성</S.Title>
          <S.CloseButton type="button" aria-label="모달 닫기" onClick={onClose}>
            <CloseIcon aria-hidden="true" />
          </S.CloseButton>
        </S.Header>

        <S.Label htmlFor="dashboard-title">대시보드 이름</S.Label>
        <Input
          id="dashboard-title"
          placeholder="새로운 대시보드"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <S.ColorSection>
          {PROFILE_COLORS.map((eachColor) => (
            <S.ColorCircle
              key={eachColor}
              type="button"
              $bgColor={eachColor}
              $selected={color === eachColor}
              onClick={() => setColor(eachColor)}
              aria-label={`색상 선택: ${eachColor}`}
            >
              {color === eachColor && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </S.ColorCircle>
          ))}
        </S.ColorSection>

        <S.ButtonGroup>
          <Button
            variant="secondary"
            width="100%"
            height="52px"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            variant="primary"
            width="100%"
            height="52px"
            onClick={() => void handleCreate()}
            disabled={!title.trim() || !color || isLoading}
          >
            생성
          </Button>
        </S.ButtonGroup>
      </S.Container>
    </Modal>
  );
}
