'use client';
import { useState } from 'react';
import Modal from '../../Modal';
import { dashboardsApi } from '@/src/apis/dashboards';
import * as S from './style';
import type {
  DashboardCreateModalProps,
  DashboardCreateModalState,
} from './type';

const COLORS = ['#7AC555', '#760DDE', '#FF8832', '#76A5EA'];

export default function DashboardCreateModal({
  onClose,
}: DashboardCreateModalProps) {
  const [title, setTitle] = useState<DashboardCreateModalState['title']>('');
  const [color, setColor] = useState<DashboardCreateModalState['color']>('');

  const handleCreate = async () => {
    try {
      await dashboardsApi.create({ title, color });
      alert('대시보드가 생성되었습니다.');
      // Toast 개발 완료시 Toast 로 대체
      onClose();
    } catch (error) {
      console.error(error);
      // 공통 에러 인터셉터 개발 후 삭제
    }
  };

  return (
    // input button 공통 컴포넌트 개발시 대체
    <Modal onClose={onClose}>
      <S.Container>
        <S.Header>
          <S.Title>새 대시보드 생성</S.Title>
          <S.CloseButton type="button" aria-label="모달 닫기">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.5459 17.954C19.7572 18.1653 19.876 18.452 19.876 18.7509C19.876 19.0497 19.7572 19.3364 19.5459 19.5477C19.3346 19.7591 19.0479 19.8778 18.749 19.8778C18.4501 19.8778 18.1635 19.7591 17.9521 19.5477L12 13.5937L6.0459 19.5459C5.83455 19.7572 5.54791 19.8759 5.24902 19.8759C4.95014 19.8759 4.66349 19.7572 4.45215 19.5459C4.2408 19.3345 4.12207 19.0479 4.12207 18.749C4.12207 18.4501 4.2408 18.1635 4.45215 17.9521L10.4062 11.9999L4.45402 6.04586C4.24268 5.83451 4.12395 5.54787 4.12395 5.24898C4.12395 4.9501 4.24268 4.66345 4.45402 4.45211C4.66537 4.24076 4.95201 4.12203 5.2509 4.12203C5.54978 4.12203 5.83643 4.24076 6.04777 4.45211L12 10.4062L17.954 4.45117C18.1654 4.23983 18.452 4.12109 18.7509 4.12109C19.0498 4.12109 19.3364 4.23983 19.5478 4.45117C19.7591 4.66251 19.8778 4.94916 19.8778 5.24804C19.8778 5.54693 19.7591 5.83358 19.5478 6.04492L13.5937 11.9999L19.5459 17.954Z"
                fill="#333236"
              />
            </svg>
          </S.CloseButton>
        </S.Header>

        <S.Label>대시보드 이름</S.Label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="새로운 대시보드"
        />

        <S.ColorSection>
          {COLORS.map((eachColor) => (
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

        <div>
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button type="button" onClick={handleCreate}>
            생성
          </button>
        </div>
      </S.Container>
    </Modal>
  );
}
