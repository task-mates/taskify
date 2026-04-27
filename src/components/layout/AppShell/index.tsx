'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/src/components/layout/Sidebar';
import AppHeader from '@/src/components/layout/AppHeader';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <Layout>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <Content>
        <AppHeader onSidebarOpen={() => setIsSidebarOpen(true)} />
        {children}
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex: 1;
`;
