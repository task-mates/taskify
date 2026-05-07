import Link from 'next/link';
import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Header = styled.header`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 96px;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-stroke);

  @media ${DEVICE.tablet} {
    height: 67px;
  }
`;

export const HdInner = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1740px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoBox = styled.div`
  width: 186px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${DEVICE.tablet} {
    width: 140px;
  }
`;

export const Util = styled.nav`
  display: flex;
  align-items: center;
  gap: 14px;

  @media ${DEVICE.mobile} {
    gap: 12px;
  }
`;

export const UtilLink = styled(Link)`
  padding: 10px 12px;
  font-size: 16px;
  color: var(--color-text-dark);
  font-weight: 500;
`;
