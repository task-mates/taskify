'use client';

import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Container = styled.div`
  margin: 0 24px;
  padding: 40px 36px 36px;
  width: 460px;
  background: #2d2d3a;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media ${DEVICE.mobile} {
    width: 280px;
    padding: 28px 24px 24px;
    gap: 12px;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;

  @media ${DEVICE.mobile} {
    font-size: 16px;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #9e9eb0;
  text-align: center;

  @media ${DEVICE.mobile} {
    font-size: 14px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 8px;

  @media ${DEVICE.mobile} {
    gap: 8px;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 54px;
  border-radius: 12px;
  background: #6b6b7b;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;

  @media ${DEVICE.mobile} {
    height: 44px;
    font-size: 14px;
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  height: 54px;
  border-radius: 12px;
  background: #d94f4f;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;

  @media ${DEVICE.mobile} {
    height: 44px;
    font-size: 14px;
  }
`;
