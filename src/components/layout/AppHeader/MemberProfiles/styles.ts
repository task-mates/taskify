import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ListPc = styled.div`
  display: flex;
  align-items: center;

  @media ${DEVICE.tablet} {
    display: none;
  }
`;

export const ListTablet = styled.div`
  display: none;
  align-items: center;

  @media ${DEVICE.tablet} {
    display: flex;
  }
`;

export const MemberIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--color-white);
  margin-left: -8px;
  overflow: hidden;

  &:first-child {
    margin-left: 0;
  }
`;

export const MemberIconFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font: var(--xs-12px-semibold);
`;

export const MemberIconExtra = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--color-white);
  margin-left: -8px;
  background: var(--color-gray-200);
  color: var(--color-gray-600);
  font: var(--xs-12px-semibold);
  display: flex;
  align-items: center;
  justify-content: center;
`;
