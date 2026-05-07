import Link from 'next/link';
import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Footer = styled.footer`
  padding: 24px 0;
`;

export const FtInner = styled.div`
  margin: 0 auto;
  padding: 0 30px;
  max-width: 1740px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${DEVICE.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

export const LogoBox = styled(Link)`
  display: block;
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

export const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;

  @media ${DEVICE.mobile} {
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
  }
`;

export const FooterUtil = styled.div`
  display: flex;
  gap: 32px;

  @media ${DEVICE.mobile} {
    gap: 20px;
  }
`;

export const FooterUtilLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-dark);
`;

export const SnsArea = styled.div`
  display: flex;
  gap: 14px;
`;

export const SnsLink = styled(Link)`
  width: 24px;
  height: 24px;
`;
