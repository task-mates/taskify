import styled from 'styled-components';

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  background: var(--color-gray-100);
  border-bottom: 1px solid var(--color-gray-300);
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  font: var(--md-14px-medium);
`;
