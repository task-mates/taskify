import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const PageMain = styled.main`
  padding: 20px 24px 40px;
  min-height: 100%;
  background: var(--color-gray-100);
  overflow-y: auto;

  @media ${DEVICE.mobile} {
    padding: 16px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 620px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font: var(--md-14px-medium);
  color: var(--color-black-200);
  padding: 0;
  margin-bottom: 8px;
  width: fit-content;

  &:hover {
    opacity: 0.7;
  }
`;

export const Card = styled.section`
  background: var(--color-white);
  border-radius: 8px;
  padding: 28px 28px 24px;

  @media ${DEVICE.mobile} {
    padding: 20px 16px;
  }
`;

export const CardTitle = styled.h2`
  font: var(--xl-20px-bold);
  color: var(--color-black-200);
  margin: 0 0 24px;
`;

export const Label = styled.label`
  display: block;
  font: var(--md-14px-medium);
  color: var(--color-black-200);
  margin-bottom: 8px;
`;

export const TextInput = styled.input`
  width: 100%;
  max-width: 500px;
  height: 48px;
  padding: 0 16px;
  border: 1px solid var(--color-gray-300);
  border-radius: 6px;
  font-size: var(--font-md);
  color: var(--color-black-200);
  box-sizing: border-box;

  @media ${DEVICE.mobile} {
    max-width: 100%;
  }
`;

export const ColorPickerRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
`;

export const ColorCircle = styled.button<{
  $color: string;
  $selected: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CheckMark = styled.span<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  color: var(--color-white);
  font-size: var(--font-lg);
  line-height: 1;
`;

export const ChangeButton = styled.button`
  display: block;
  width: 100%;
  max-width: 500px;
  height: 48px;
  margin-top: 24px;
  background: var(--color-brand-300);
  color: var(--color-white);
  font: var(--lg-16px-semibold);
  border-radius: 6px;

  &:hover {
    background: var(--color-brand-400);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media ${DEVICE.mobile} {
    max-width: 100%;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ScrollList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const ColumnLabel = styled.p`
  font-size: var(--font-md);
  color: var(--color-gray-400);
  margin: 0 0 8px;
`;

export const ListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid var(--color-gray-200);
`;

export const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div<{ $bg: string }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${({ $bg }) => $bg};
  color: var(--color-white);
  font: var(--md-14px-medium);
  font-weight: var(--fw-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-transform: uppercase;
`;

export const MemberName = styled.span`
  font-size: var(--font-md);
  color: var(--color-black-200);
`;

export const BadgeText = styled.span`
  font: var(--xs-12px-semibold);
  color: var(--color-gray-400);
  margin-left: 2px;
`;

export const EmailText = styled.span`
  font-size: var(--font-md);
  color: var(--color-black-200);
`;

export const OutlineButton = styled.button`
  height: 32px;
  padding: 0 16px;
  border: 1px solid var(--color-gray-300);
  border-radius: 4px;
  background: var(--color-white);
  font: var(--sm-13px-medium);
  color: var(--color-gray-500);
  flex-shrink: 0;

  &:hover {
    background: var(--color-gray-100);
  }
`;

export const InviteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 14px;
  background: var(--color-brand-300);
  color: var(--color-white);
  font: var(--sm-13px-medium);
  border-radius: 4px;

  &:hover {
    background: var(--color-brand-400);
  }
`;

export const DeleteButton = styled.button`
  align-self: center;
  width: 100%;
  max-width: 320px;
  height: 52px;
  background: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  font: var(--lg-16px-semibold);
  color: var(--color-black-200);
  margin-top: 8px;

  &:hover {
    background: var(--color-gray-100);
  }
`;
