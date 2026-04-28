'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Main = styled.main`
  min-height: 100vh;
  padding: 56px 20px 72px;
`;

export const Content = styled.div`
  max-width: 860px;
  margin: 0 auto;
`;

export const HomeLink = styled(Link)`
  display: inline-block;
  width: 180px;
  height: 40px;
  position: relative;
`;

export const Title = styled.h1`
  margin-top: 16px;
  margin-bottom: 12px;
  font-size: 36px;
  color: #333236;
`;

export const Description = styled.p`
  margin-bottom: 28px;
  color: #6b6674;
`;

export const ListSection = styled.section`
  display: grid;
  gap: 14px;
`;

export const Item = styled.article`
  background-color: #ffffff;
  border: 1px solid #ebe9f4;
  border-radius: 12px;
  padding: 20px;
`;

export const ToggleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
`;

export const QuestionTitle = styled.h2`
  margin-bottom: 0;
`;

export const QuestionText = styled.span`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333236;
`;

export const LeftToggleIcon = styled.span`
  color: #83c6e5;
  font-size: 18px;
  line-height: 1;
`;

export const Answer = styled.p<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #ebe9f4;
  line-height: 1.6;
  color: #4b4654;
`;
