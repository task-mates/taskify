import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';
import Modal from '@/src/components/Modal';
import { HeaderVariant, TodoBaseModalProps } from './type';

export default function TodoBaseModal({
  onClose,
  title,
  labelId,
  badgeGroup,
  actionMenu,
  children,
  headerVariant = 'default',
}: TodoBaseModalProps) {
  return (
    <Modal onClose={onClose} labelledById={labelId}>
      <Container>
        <Wrapper>
          <Header $variant={headerVariant}>
            <HeaderLeft>
              <Title id={labelId}>{title}</Title>
              {badgeGroup}
            </HeaderLeft>

            <HeaderRight>
              {actionMenu}
              <CloseButton
                type="button"
                onClick={onClose}
                aria-label="모달 닫기"
              >
                {/* 추후 svg 대신 아이콘 컴포넌트로 변경 예정 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.5459 17.954C19.7572 18.1653 19.876 18.452 19.876 18.7509C19.876 19.0497 19.7572 19.3364 19.5459 19.5477C19.3346 19.7591 19.0479 19.8778 18.749 19.8778C18.4501 19.8778 18.1635 19.7591 17.9521 19.5477L12 13.5937L6.0459 19.5459C5.83455 19.7572 5.54791 19.8759 5.24902 19.8759C4.95014 19.8759 4.66349 19.7572 4.45215 19.5459C4.2408 19.3345 4.12207 19.0479 4.12207 18.749C4.12207 18.4501 4.2408 18.1635 4.45215 17.9521L10.4062 11.9999L4.45402 6.04586C4.24268 5.83451 4.12395 5.54787 4.12395 5.24898C4.12395 4.9501 4.24268 4.66345 4.45402 4.45211C4.66537 4.24076 4.95201 4.12203 5.2509 4.12203C5.54978 4.12203 5.83643 4.24076 6.04777 4.45211L12 10.4062L17.954 4.45117C18.1654 4.23983 18.452 4.12109 18.7509 4.12109C19.0498 4.12109 19.3364 4.23983 19.5478 4.45117C19.7591 4.66251 19.8778 4.94916 19.8778 5.24804C19.8778 5.54693 19.7591 5.83358 19.5478 6.04492L13.5937 11.9999L19.5459 17.954Z"
                    fill="#333236"
                  />
                </svg>
              </CloseButton>
            </HeaderRight>
          </Header>

          <Content>{children}</Content>
        </Wrapper>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  position: relative;
  padding: 30px 14px 30px 30px;
  max-width: 600px;
  min-width: 320px;
  width: 100%;
  background: #f3f5f8;
  border: 1px solid #9fa6b2;
  border-radius: 24px;

  @media ${DEVICE.mobile} {
    padding: 0 10px 0 30px;
    max-width: none;
    border: none;
    border-radius: 0;
    height: 100%;
  }

  @media (max-width: 499px) {
    padding: 0 30px;
    overflow: auto;
  }

  @media ${DEVICE.mobile} and (hover: none) and (pointer: coarse) {
    padding: 0 30px;
    overflow: auto;
  }
`;

const Wrapper = styled.div`
  max-height: 80vh;
  overflow: auto;
  padding-right: 10px;

  scrollbar-color: #5b5963 transparent;

  @media ${DEVICE.mobile} {
    max-height: none;
    padding: 24px 14px 24px 0;
    padding-top: 24px;
    padding-right: 14px;
    padding-bottom: 24px;
    height: 100%;
  }

  @media (max-width: 499px) {
    padding-right: 0;
    height: auto;
  }

  @media ${DEVICE.mobile} and (hover: none) and (pointer: coarse) {
    padding-right: 0;
    height: auto;
  }
`;

const Header = styled.div<{ $variant: HeaderVariant }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $variant }) =>
    $variant === 'card' &&
    `
      padding-bottom: 24px;
      border-bottom: 1px solid #D9D9D9;

      @media ${DEVICE.mobile}{
        padding-bottom: 20px;
      }
  `}
`;

const HeaderLeft = styled.div``;

const Title = styled.h2`
  width: 82%;
  font-size: 24px;
  font-weight: 600;
  color: #333236;

  @media ${DEVICE.mobile} {
    font-size: 20px;
  }
`;

const HeaderRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
  }

  @media ${DEVICE.mobile} {
    width: 20px;
    height: 20px;
  }
`;

const Content = styled.div``;
