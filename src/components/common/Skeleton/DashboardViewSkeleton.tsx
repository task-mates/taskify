'use client';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

const ColumnList = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
  overflow: hidden;

  @media ${DEVICE.mobile} {
    flex-direction: column;
    overflow: visible;
    align-items: center;
  }
`;

const Column = styled.div`
  min-width: 320px;
  height: 100%;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media ${DEVICE.mobile} {
    min-width: unset;
    width: 100%;
    max-width: 400px;
    height: auto;
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardBox = styled.div`
  border-radius: 20px;
  background: var(--color-white);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
`;

const TagRow = styled.div`
  display: flex;
  gap: 6px;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CARD_COUNTS = [3, 4, 2];
const TITLE_WIDTHS = [100, 130, 88];

export default function DashboardViewSkeleton({ columns = 3 }: { columns?: number }) {
  return (
    <SkeletonTheme baseColor="#c8d5df" highlightColor="#d8e4ed">
      {/* 페이지 타이틀 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <Skeleton circle width={18} height={18} />
        <Skeleton width={200} height={28} borderRadius={6} />
      </div>

      <ColumnList aria-hidden="true">
        {Array.from({ length: columns }).map((_, col) => (
          <Column key={col}>
            {/* 컬럼 헤더 */}
            <ColumnHeader>
              <TitleGroup>
                <Skeleton width={TITLE_WIDTHS[col % TITLE_WIDTHS.length]} height={18} borderRadius={6} />
                <Skeleton circle width={20} height={20} />
              </TitleGroup>
              <Skeleton width={56} height={20} borderRadius={6} />
            </ColumnHeader>

            {/* 카드 추가 버튼 */}
            <Skeleton width="100%" height={40} borderRadius={8} />

            {/* 카드들 */}
            {Array.from({ length: CARD_COUNTS[col % CARD_COUNTS.length] }).map((_, card) => (
              <CardBox key={card}>
                {col === 0 && card === 0 && (
                  <Skeleton width="100%" height={80} borderRadius={12} />
                )}
                <Skeleton width={`${65 + (card % 3) * 10}%`} height={18} borderRadius={6} />
                <TagRow>
                  <Skeleton width={52} height={22} borderRadius={8} />
                  <Skeleton width={64} height={22} borderRadius={8} />
                </TagRow>
                <Skeleton width={88} height={13} borderRadius={6} />
                <CardBottom>
                  <Skeleton circle width={28} height={28} />
                </CardBottom>
              </CardBox>
            ))}
          </Column>
        ))}
      </ColumnList>
    </SkeletonTheme>
  );
}
