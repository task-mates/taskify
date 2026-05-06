import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;

  @media ${DEVICE.mobile} {
    gap: 12px;
  }
`;
