'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/src/components/layout/Sidebar';
import Header from '@/src/components/layout/Header';
import { DEVICE } from '@/src/styles/Breakpoints';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <MobileHeader>
        {/*논의 후 아이콘으로 변경 예정*/}
        <HamburgerButton
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="사이드바 열기"
        >
          ☰
        </HamburgerButton>
      </MobileHeader>

      <Layout>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <Content>
          <Header />
          {children}
        </Content>
      </Layout>
    </>
  );
}

const MobileHeader = styled.header`
  display: none;

  @media ${DEVICE.mobile} {
    height: 56px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }
`;

const HamburgerButton = styled.button`
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
`;

const Layout = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex: 1;
`;
