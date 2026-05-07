'use client';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

const Section = styled.div`
  margin-bottom: 36px;
`;

const HeadingSkeleton = styled.div`
  margin-bottom: 14px;
`;

const CardRow = styled.div`
  display: flex;
  gap: 14px;
  overflow: hidden;
`;

const CardBox = styled.div`
  flex: 0 0 332px;
  height: 70px;
  border-radius: 12px;
  overflow: hidden;

  @media ${DEVICE.tablet} {
    flex-basis: calc((100% - (14px * 1.5)) / 2.5);
  }

  @media ${DEVICE.mobile} {
    flex-basis: calc((100% - (14px * 0.5)) / 1.5);
  }
`;

const TableWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  height: 600px;
  padding: 24px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ToolbarRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 14px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px 180px;
  gap: 12px;
  align-items: center;
  padding: 14px 8px;
  border-bottom: 1px solid var(--color-gray-200);

  @media ${DEVICE.mobile} {
    grid-template-columns: 1fr 120px 160px;
  }
`;

export default function MyDashboardSkeleton() {
  return (
    <SkeletonTheme baseColor="#ececee" highlightColor="#f8f7fa">
      {/* 내 대시보드 섹션 */}
      <Section>
        <HeadingSkeleton>
          <Skeleton width={120} height={22} borderRadius={6} />
        </HeadingSkeleton>
        <CardRow>
          {[0, 1, 2, 3].map((i) => (
            <CardBox key={i}>
              <Skeleton width="100%" height={70} borderRadius={12} />
            </CardBox>
          ))}
        </CardRow>
      </Section>

      {/* 초대받은 대시보드 섹션 */}
      <Section>
        <HeadingSkeleton>
          <Skeleton width={160} height={22} borderRadius={6} />
        </HeadingSkeleton>
        <TableWrapper>
          <ToolbarRow>
            <Skeleton width={200} height={42} borderRadius={8} />
          </ToolbarRow>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <TableRow key={i}>
              <Skeleton width={`${50 + (i % 4) * 15}%`} height={14} borderRadius={6} />
              <Skeleton width="70%" height={14} borderRadius={6} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Skeleton width={52} height={30} borderRadius={999} />
                <Skeleton width={52} height={30} borderRadius={999} />
              </div>
            </TableRow>
          ))}
        </TableWrapper>
      </Section>
    </SkeletonTheme>
  );
}
