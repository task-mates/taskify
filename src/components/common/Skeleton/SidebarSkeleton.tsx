'use client';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';

const List = styled.ul`
  margin: 0;
  padding: 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 8px;
`;

export default function SidebarSkeleton({ count = 6 }: { count?: number }) {
  return (
    <SkeletonTheme baseColor="#ececee" highlightColor="#f8f7fa">
      <List aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
          <Item key={i}>
            <Skeleton circle width={11} height={11} />
            <Skeleton width={`${60 + (i % 3) * 20}%`} height={14} borderRadius={6} />
          </Item>
        ))}
      </List>
    </SkeletonTheme>
  );
}
