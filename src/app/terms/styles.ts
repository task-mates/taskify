import Link from 'next/link';
import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 32px 16px;
  background-color: #f9fafb;
`;

export const Card = styled.section`
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 20px 18px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid #eaecf0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${DEVICE.tablet} {
    padding: 20px 14px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #303030;
`;

export const CloseLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #f9fafb;
  border: 1px solid #eaecf0;
  color: #344054;
  text-decoration: none;
  font-size: 20px;
  line-height: 1;
  font-weight: 500;

  &:hover {
    background: #f2f4f7;
  }
`;

export const UpdatedAt = styled.p`
  font-size: 13px;
  color: #667085;
`;

export const Content = styled.pre`
  margin: 0;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #eaecf0;
  background: #fcfcfd;
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: 1.6;
  font-size: 14px;
  color: #344054;
  font-family: inherit;
`;
