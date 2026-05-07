import styled from 'styled-components';
import { MYPAGE_CARD_MAX_WIDTH } from './constants';
import { DEVICE } from '@/src/styles/Breakpoints';
import Button from '@/src/components/common/Button';

export const Page = styled.main`
  box-sizing: border-box;
  width: 100%;
  padding: 24px 32px;

  @media ${DEVICE.mobile} {
    padding: 24px 16px;
  }
`;

export const Section = styled.section`
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 20px;
  background-color: var(--color-white);
`;

export const ProfileSection = styled(Section)`
  box-sizing: border-box;
  width: min(100%, ${MYPAGE_CARD_MAX_WIDTH});
  max-width: ${MYPAGE_CARD_MAX_WIDTH};
  min-height: 366px;
  margin: 0 auto 16px;

  @media ${DEVICE.mobile} {
    height: auto;
  }
`;

export const PasswordSection = styled(Section)`
  box-sizing: border-box;
  width: min(100%, ${MYPAGE_CARD_MAX_WIDTH});
  max-width: ${MYPAGE_CARD_MAX_WIDTH};
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const TopBackWrap = styled.div`
  width: min(100%, ${MYPAGE_CARD_MAX_WIDTH});
  max-width: ${MYPAGE_CARD_MAX_WIDTH};
  margin: 0 auto 8px;
`;

export const BackButton = styled.button`
  border: none;
  background: transparent;
  color: #374151;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 0;
`;

export const BackIcon = styled.div`
  width: 16px;
  height: 16px;
  display: block;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ProfileContent = styled.div`
  display: flex;
  align-items: start;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 30px;

  @media ${DEVICE.mobile} {
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
  }
`;

export const ProfileImageWrap = styled.div`
  position: relative;
`;

export const ProfileImageButton = styled.button<{ $size: string }>`
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  min-width: ${({ $size }) => $size};
  min-height: ${({ $size }) => $size};
`;

export const ProfileIcon = styled.div`
  width: 100%;
  height: 100%;
  display: block;
`;

export const ProfilePreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
  display: block;
`;

export const ProfileMenu = styled.div`
  position: absolute;
  left: calc(100% + 12px);
  top: 0;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  background-color: var(--color-white);
  box-shadow: 0 8px 20px rgba(17, 24, 39, 0.12);
  padding: 6px;
  display: grid;
  gap: 4px;
  min-width: 120px;
  z-index: 1;

  @media ${DEVICE.mobile} {
    left: 0;
    top: calc(100% + 8px);
  }
`;

export const ProfileMenuButton = styled.button<{ $danger?: boolean }>`
  border: none;
  border-radius: 6px;
  background-color: transparent;
  padding: 8px;
  text-align: left;
  cursor: pointer;
  color: ${({ $danger }) => ($danger ? 'var(--color-red)' : 'inherit')};
`;

export const ProfileFormWrap = styled.div`
  display: grid;
  gap: 10px;
  flex: 1;
  min-width: 280px;

  @media ${DEVICE.mobile} {
    width: 100%;
    min-width: 0;
  }
`;

export const ProfileFields = styled.div`
  display: grid;
  gap: 8px;
  align-content: start;
`;

export const Label = styled.label``;

export const DisabledValue = styled.div`
  height: 44px;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f3f4f6;
  color: #6b7280;
  box-sizing: border-box;
`;

export const Spacer = styled.div``;

export const ErrorSpace = styled.p`
  min-height: 18px;
  font-size: 13px;
  color: var(--color-error);
  margin: 0;
`;

export const SaveButton = styled(Button).attrs({
  variant: 'primary',
  width: '100%',
  height: '44px',
})`
  border-radius: 8px;
`;

export const PasswordForm = styled.form`
  display: grid;
  gap: 10px;
  margin-top: 30px;
`;


export const PasswordButton = styled(Button).attrs({
  variant: 'primary',
  width: '100%',
  height: '44px',
})`
  margin-top: 6px;
  border-radius: 8px;
`;

export const LogoutButton = styled(Button).attrs({
  variant: 'ghost',
  height: '52px',
})`
  box-sizing: border-box;
  width: min(100%, ${MYPAGE_CARD_MAX_WIDTH});
  max-width: ${MYPAGE_CARD_MAX_WIDTH};
  margin: 16px auto 0;
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  color: var(--color-black-200);
`;
