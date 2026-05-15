import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media ${DEVICE.mobile} {
    gap: 20px;
  }
`;
