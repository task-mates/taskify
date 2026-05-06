import Link from 'next/link';
import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Container = styled.div``;

export const LandingWrapper = styled.div`
  padding-top: 96px;
  overflow: hidden;

  @media ${DEVICE.tablet} {
    padding-top: 67px;
  }
`;

export const Inner = styled.div`
  margin: 0 auto;
  padding: 0 30px;
  max-width: 1740px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${DEVICE.tablet} {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 40px;
    max-width: 535px;
    padding: 0;
  }

  @media ${DEVICE.mobile} {
    padding: 0 30px;
  }
`;

export const Intro = styled.section`
  padding: 110px 0 180px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 95px;

  @media ${DEVICE.tablet} {
    padding: 60px 0;
    gap: 54px;
  }

  @media ${DEVICE.mobile} {
    flex-direction: column;
    gap: 0;
  }
`;

export const TextArea = styled.div`
  padding-left: 20px;

  @media ${DEVICE.mobile} {
    padding-left: 0;
  }
`;

export const Title = styled.h2`
  margin-bottom: 13px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: clamp(34px, 3.5vw, 60px);
  font-weight: 700;
  color: #404040;

  @media ${DEVICE.tablet} {
    font-size: 34px;
    white-space: nowrap;
  }

  @media ${DEVICE.mobile} {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
`;

export const ServiceName = styled.span`
  font-size: clamp(50px, 5vw, 84px);
  color: #7ac4e8;

  @media ${DEVICE.tablet} {
    font-size: 50px;
  }

  @media ${DEVICE.mobile} {
    font-size: 30px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;

  @media ${DEVICE.mobile} {
    gap: 12px;
  }
`;

const BaseButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 50px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;

  @media ${DEVICE.tablet} {
    width: 135px;
    border-radius: 14px;
  }

  @media ${DEVICE.mobile} {
    width: 150px;
  }
`;

export const SignupButton = styled(BaseButton)`
  background-color: #303436;
`;

export const LoginButton = styled(BaseButton)`
  background-color: #83c6e5;
`;

export const ImageArea = styled.div`
  width: 60%;
  margin-right: -8%;

  @media ${DEVICE.tablet} {
    width: 90%;
    margin-right: -35%;
  }

  @media ${DEVICE.mobile} {
    display: none;
  }
`;

export const MockImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PointSection = styled.section`
  position: relative;
  padding: 70px 0 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;

  @media ${DEVICE.tablet} {
    padding: 100px 0;
  }

  @media ${DEVICE.mobile} {
    padding: 50px 0;
  }
`;

export const PointImageArea = styled.div`
  width: 44%;

  @media ${DEVICE.tablet} {
    width: 100%;
  }
`;

export const PointImage = styled.img`
  width: 100%;
  display: block;
`;

export const PointTextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media ${DEVICE.mobile} {
    gap: 12px;
  }
`;

export const PointText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #31a1d4;

  @media ${DEVICE.tablet} {
    font-size: 20px;
  }

  @media ${DEVICE.mobile} {
    font-size: 16px;
  }
`;

export const PointTitle = styled.h2`
  font-size: clamp(32px, 3vw, 50px);
  line-height: 1.4;
  font-weight: 700;
  color: #404040;

  @media ${DEVICE.mobile} {
    font-size: 24px;
  }
`;

export const PointDescription = styled.p`
  font-size: 18px;
  line-height: 1.5;
  font-weight: 500;
  color: #a39fb2;

  @media ${DEVICE.tablet} {
    font-size: 16px;
  }
`;

export const PointDescriptionPc = styled.span`
  display: block;

  @media ${DEVICE.mobile} {
    display: none;
  }
`;
export const PointDescriptionMobile = styled.span`
  display: none;

  @media ${DEVICE.mobile} {
    display: block;
  }
`;

export const PointImageList = styled.ul`
  width: 100%;
  display: flex;
  gap: 24px;

  @media ${DEVICE.tablet} {
    flex-direction: column;
    gap: 50px;
  }

  @media ${DEVICE.mobile} {
    gap: 45px;
  }
`;

export const PointImageItem = styled.li`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 35px;

  @media ${DEVICE.mobile} {
    gap: 20px;
  }
`;

export const PointInfo = styled.div``;

export const PointInfoTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #404040;
`;

export const PointInfoDescription = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #404040;

  @media ${DEVICE.tablet} {
    font-size: 14px;
  }
`;

export const PointSection1 = styled(PointSection)`
  @media ${DEVICE.tablet} {
    padding: 50px 0;
  }
`;

export const Inner1 = styled(Inner)`
  flex-direction: row-reverse;
  justify-content: center;
  gap: 140px;

  @media ${DEVICE.tablet} {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 40px;
    max-width: 535px;
  }

  @media ${DEVICE.mobile} {
    padding: 0 30px;
  }
`;

export const PointDeco1 = styled.div`
  position: absolute;
  left: 0;
  bottom: 8%;
  width: 25%;

  @media ${DEVICE.tablet} {
    display: none;
  }

  @media (min-width: 2561px) {
    display: none;
  }
`;

export const PointDeco2 = styled.div`
  z-index: -1;
  position: absolute;
  right: 0;
  width: 25%;

  @media ${DEVICE.tablet} {
    display: none;
  }

  @media (min-width: 2561px) {
    display: none;
  }
`;

export const PointDecoImage = styled.img``;

export const PointTextArea2 = styled(PointTextArea)`
  padding-left: 46px;
  transform: translateY(-45%);

  @media ${DEVICE.tablet} {
    padding-left: 0;
    transform: translateY(0);
  }
`;

export const PointImageArea2 = styled(PointImageArea)`
  margin-right: min(8vw, 144px);
  width: min(39%, 644px);

  @media ${DEVICE.tablet} {
    margin: 0 auto;
    width: 100%;
    max-width: 375px;
  }
`;

export const Inner3 = styled(Inner)`
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  padding: 0 76px;

  @media ${DEVICE.tablet} {
    padding: 0 30px;
  }
`;

export const PointImageArea3 = styled(PointImageArea)`
  width: 100%;
`;
