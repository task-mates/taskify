'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Sidebar from '@/src/components/layout/Sidebar';
import AppHeader from '@/src/components/layout/AppHeader';
import { getDashboardList, getDashboardById } from '@/src/apis/dashboards';
import type { Dashboard } from '@/src/apis/dashboards/type';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState<Dashboard | null>(
    null
  );

  const pathname = usePathname();
  const params = useParams();
  const dashboardId = params?.id ? Number(params.id) : undefined;
  const createdByMe = currentDashboard?.createdByMe ?? false;
  const dashboardTitle = currentDashboard?.title;

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fetchDashboards = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { dashboards } = await getDashboardList({ size: 20 });
        setDashboards(dashboards);
      } catch (e) {
        console.error(e);
        setIsError(true);
        setDashboards([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboards();
  }, []);

  useEffect(() => {
    if (!dashboardId) {
      setCurrentDashboard(null);
      return;
    }
    getDashboardById(dashboardId)
      .then(setCurrentDashboard)
      .catch(() => setCurrentDashboard(null));
  }, [dashboardId]);

  return (
    <Layout>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dashboards={dashboards}
        isLoading={isLoading}
        isError={isError}
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
  height: 100dvh;
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
