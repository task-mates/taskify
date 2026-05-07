'use client';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

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

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const WIDTHS = ['52%', '68%', '45%', '74%', '58%', '40%'];

export default function InvitedTableSkeleton({ count = 6 }: { count?: number }) {
  return (
    <SkeletonTheme baseColor="#ececee" highlightColor="#f8f7fa">
      {Array.from({ length: count }).map((_, i) => (
        <TableRow key={i} aria-hidden="true">
          <Skeleton width={WIDTHS[i % WIDTHS.length]} height={14} borderRadius={6} />
          <Skeleton width="65%" height={14} borderRadius={6} />
          <Actions>
            <Skeleton width={52} height={30} borderRadius={999} />
            <Skeleton width={52} height={30} borderRadius={999} />
          </Actions>
        </TableRow>
      ))}
    </SkeletonTheme>
  );
}
