import { DEVICE } from '@/src/styles/Breakpoints';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media ${DEVICE.mobile} {
    gap: 20px;
  }
`;
