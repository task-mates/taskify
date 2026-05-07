'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePathname, useParams, useRouter } from 'next/navigation';
import Sidebar from '@/src/components/layout/Sidebar';
import AppHeader from '@/src/components/layout/AppHeader';
import { getDashboardById } from '@/src/apis/dashboards';
import type { Dashboard } from '@/src/apis/dashboards/type';
import { onDashboardChanged } from '@/src/utils/dashboardListEvent';
import { getAccessToken } from '@/src/utils/authTokenStorage';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState<Dashboard | null>(
    null
  );

  const pathname = usePathname();
  const params = useParams();
  const dashboardId = params?.id ? Number(params.id) : undefined;
  const createdByMe = currentDashboard?.createdByMe ?? false;
  const dashboardTitle = currentDashboard?.title;

  useEffect(() => {
    if (Boolean(getAccessToken())) {
      setIsAuthed(true);
    } else {
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!dashboardId) {
      setCurrentDashboard(null);
      return;
    }
    getDashboardById(dashboardId)
      .then(setCurrentDashboard)
      .catch(() => setCurrentDashboard(null));
  }, [dashboardId]);

  useEffect(() => {
    if (!dashboardId) return;
    return onDashboardChanged(() => {
      getDashboardById(dashboardId)
        .then(setCurrentDashboard)
        .catch(() => null);
    });
  }, [dashboardId]);

  if (isAuthed !== true) return null;

  return (
    <Layout>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <Content>
        <AppHeader
          onSidebarOpen={() => setIsSidebarOpen(true)}
          dashboardId={dashboardId}
          dashboardTitle={dashboardTitle}
          createdByMe={createdByMe}
        />
        <MainSlot>{children}</MainSlot>
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100dvh;
  overflow: hidden;
`;

const Content = styled.main`
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainSlot = styled.div`
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
`;
