import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';
import CommonButton from '@/src/components/common/Button';

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;

  @media ${DEVICE.mobile} {
    gap: 12px;
  }
`;

export const ActionButton = styled(CommonButton)`
  flex: 1;
  height: 60px;
  border-radius: 14px;
  font-size: 18px;

  @media ${DEVICE.mobile} {
    height: 50px;
    font-size: 16px;
  }
`;
