import styled, { css, keyframes } from 'styled-components';
import NoDashboardIcon from '@/src/components/icons/icon-no-dashboard.svg';
import PlusIcon from '@/src/components/icons/icon-plus.svg';
import SearchIcon from '@/src/components/icons/icon-search.svg';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Page = styled.main`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: calc(100vh - 60px);
  height: calc(100dvh - 60px);
  min-height: 0;
  padding: 24px 32px;
  overflow-y: auto;
  overscroll-behavior: contain;
  background-color: var(--color-gray-100);

  @media ${DEVICE.mobile} {
    height: calc(100vh - 60px);
    height: calc(100dvh - 60px);
    padding: 24px 16px;
  }
`;

export const PageTitle = styled.h1`
  margin: 0 0 28px;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-gray-900);
`;

export const Section = styled.section`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin-bottom: 36px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionHeading = styled.h2`
  margin: 0 0 14px;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-gray-800, #49474f);

  @media ${DEVICE.mobile} {
    font-size: 18px;
  }
`;

export const MyDashboardsHeadingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const MyDashboardsHeading = styled(SectionHeading)`
  margin: 0;
`;

export const DesktopCarouselControls = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  @media ${DEVICE.tablet} {
    display: none;
  }
`;

export const DesktopCarouselButton = styled.button`
  box-sizing: border-box;
  min-width: 44px;
  height: 34px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid var(--color-gray-200, #ececee);
  background: var(--color-white);
  cursor: pointer;
  font-family: var(--font-main);
  font-size: 14px;
  color: var(--color-gray-800, #49474f);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const MyDashboardsRow = styled.div`
  width: 100%;
`;

export const MyDashboardCards = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: stretch;
  gap: 14px;
  flex-wrap: nowrap;
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: none;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MyDashboardCard = styled.li`
  box-sizing: border-box;
  flex: 0 0 332px;
  height: 70px;
  border-radius: 12px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200, #ececee);
  overflow: hidden;
  scroll-snap-align: start;

  @media ${DEVICE.tablet} {
    flex-basis: calc((100% - (14px * 1.5)) / 2.5);
  }

  @media ${DEVICE.mobile} {
    flex-basis: calc((100% - (14px * 0.5)) / 1.5);
  }

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const skeletonShimmer = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

const skeletonBase = css`
  background: linear-gradient(
    90deg,
    #f1f3f5 25%,
    #e6e9ed 37%,
    #f1f3f5 63%
  );
  background-size: 400% 100%;
  animation: ${skeletonShimmer} 1.5s ease-in-out infinite;
`;

export const MyDashboardSkeletonCard = styled(MyDashboardCard)`
  padding: 0 18px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MyDashboardSkeletonDot = styled.span`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  ${skeletonBase};
`;

export const MyDashboardSkeletonTitle = styled.span`
  height: 16px;
  width: 52%;
  border-radius: 8px;
  ${skeletonBase};
`;

export const MyDashboardSkeletonArrow = styled.span`
  margin-left: auto;
  width: 14px;
  height: 14px;
  border-radius: 4px;
  ${skeletonBase};
`;

export const PaginationRow = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PaginationButton = styled.button`
  box-sizing: border-box;
  height: 34px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid var(--color-gray-200, #ececee);
  background: var(--color-white);
  cursor: pointer;
  font-family: var(--font-main);
  font-size: 14px;
  color: var(--color-gray-800, #49474f);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PaginationText = styled.span`
  font-size: 14px;
  color: var(--color-gray-600, #787486);
`;

export const EmptyInvitedText = styled.p`
  margin: 0;
  max-width: 28rem;
  padding: 0 12px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--color-gray-500, #787486);
  text-align: center;
  word-break: keep-all;

  @media ${DEVICE.mobile} {
    font-size: 14px;
    max-width: 100%;
  }
`;

export const InvitedPanel = styled.div<{ $empty?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  max-width: 1480px;
  height: 500px;
  overflow-x: hidden;
  overflow-y: ${({ $empty }) => ($empty ? 'hidden' : 'auto')};
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 24px;

  @media ${DEVICE.tablet} {
    padding: 20px;
  }

  @media ${DEVICE.mobile} {
    padding: 16px;
  }

  @media ${DEVICE.heightSm} {
    height: clamp(260px, 48vh, 360px);
  }
`;

export const InvitedEmptyInner = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;

  @media ${DEVICE.tablet} {
    gap: 16px;
    padding: 20px;
  }

  @media ${DEVICE.mobile} {
    gap: 14px;
    padding: 16px 12px;
  }
`;

export const InvitedNoResultState = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100% - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InvitedEmptyIllustration = styled(NoDashboardIcon)`
  display: block;
  flex-shrink: 0;
`;

export const InvitedToolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 14px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: min(315px, 100%);

  @media ${DEVICE.tablet} {
    width: 100%;
  }

  @media ${DEVICE.mobile} {
    width: 100%;
  }
`;

export const InvitedSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const InvitedSearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  padding: 0 12px 0 40px;
  border-radius: 8px;
  border: 1px solid var(--color-gray-200, #ececee);
  background: var(--color-white);
  font-family: var(--font-main);
  font-size: 14px;

  @media ${DEVICE.mobile} {
    height: 36px;
  }

  &::placeholder {
    color: var(--color-gray-500, #787486);
  }
`;

export const InvitedTable = styled.div`
  width: 100%;
  min-width: 0;
`;

export const InvitedTableScroller = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
`;

export const InvitedTableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px 180px;
  min-width: 620px;
  gap: 12px;
  padding: 10px 8px;
  font-size: 13px;
  color: var(--color-gray-500, #787486);
  border-bottom: 1px solid var(--color-gray-200, #ececee);

  @media ${DEVICE.mobile} {
    grid-template-columns: 1fr 120px 160px;
  }

  span:last-child {
    justify-self: end;
    width: 108px;
    text-align: left;
    padding-left: 8px;
  }
`;

export const InvitedTableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px 180px;
  min-width: 620px;
  gap: 12px;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid var(--color-gray-200, #ececee);

  @media ${DEVICE.mobile} {
    grid-template-columns: 1fr 120px 160px;
  }
`;

export const InvitedSkeletonRows = styled.div`
  min-width: 620px;
`;

export const InvitedSkeletonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px 180px;
  gap: 12px;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid var(--color-gray-200, #ececee);

  @media ${DEVICE.mobile} {
    grid-template-columns: 1fr 120px 160px;
  }
`;

export const InvitedSkeletonCell = styled.span<{ $width?: string }>`
  display: inline-block;
  height: 14px;
  width: ${({ $width }) => $width ?? '100%'};
  border-radius: 8px;
  ${skeletonBase};
`;

export const InvitedSkeletonActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const InvitedSkeletonAction = styled.span`
  display: inline-block;
  height: 30px;
  width: 52px;
  border-radius: 999px;
  ${skeletonBase};
`;

export const InvitedTitle = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: var(--color-gray-800, #49474f);
`;

export const InvitedInviter = styled.span`
  font-size: 14px;
  color: var(--color-gray-800, #49474f);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const InvitedActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const InvitedActionButton = styled.button<{
  $variant: 'primary' | 'secondary';
}>`
  box-sizing: border-box;
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'primary'
        ? 'var(--color-blue-300, #83C6E5)'
        : 'var(--color-gray-200, #ececee)'};
  background: ${({ $variant }) =>
    $variant === 'primary'
      ? 'var(--color-blue-300, #83C6E5)'
      : 'var(--color-gray-700, #555)'};
  color: ${({ $variant }) => ($variant === 'primary' ? '#fff' : '#fff')};
  cursor: pointer;
  font-family: var(--font-main);
  font-size: 13px;
  font-weight: 600;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const InvitedSentinel = styled.div`
  height: 1px;
`;

export const DashboardList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DashboardRow = styled.li`
  border-radius: 12px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200, #ececee);

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

export const ColorDot = styled.span<{ $color: string }>`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin-right: 16px;
  flex-shrink: 0;
`;

export const DashboardTitle = styled.span`
  flex: 1;
  min-width: 0;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusText = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--color-gray-500, #787486);
`;

export const NewDashboardTrigger = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: none;
  height: 100%;
  padding: 0 20px;
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  background-color: var(--color-white);
  cursor: pointer;
  font-family: var(--font-main);
  font-size: 17px;
  font-weight: 600;
  color: var(--color-gray-900);
  text-align: left;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

export const NewDashboardLabel = styled.span`
  flex: 1;
`;

export const PlusIconBox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 6px 8px;
  border-radius: 6px;
  background-color: rgb(233, 245, 254);
`;

export const StyledPlusIcon = styled(PlusIcon)`
  display: block;
`;
