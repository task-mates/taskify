'use client';
import { useState } from 'react';
import Modal from '../../Modal';
import { dashboardsApi } from '@/src/apis/dashboards';
import type {
  DashboardCreateModalProps,
  DashboardCreateModalState,
} from './type';

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
      <div>
        <h1>대시보드 만들기</h1>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <div>
          <div onClick={() => setColor('#7AC555')}>색깔 선택 버튼</div>
          <div onClick={() => setColor('#760DDE')}>색깔 선택 버튼</div>
          <div onClick={() => setColor('#FF8832')}>색깔 선택 버튼</div>
          <div onClick={() => setColor('#76A5EA')}>색깔 선택 버튼</div>
        </div>
        <button onClick={handleCreate}>생성</button>
      </div>
    </Modal>
  );
}
