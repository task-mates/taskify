'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Sidebar from '@/src/components/layout/Sidebar';
import AppHeader from '@/src/components/layout/AppHeader';
import { dashboardsApi } from '@/src/apis/dashboards';
import type { Dashboard } from '@/src/apis/dashboards/type';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const pathname = usePathname();
  const params = useParams();
  const dashboardId = params?.id ? Number(params.id) : null;
  const createdByMe =
    dashboards.find((d) => d.id === dashboardId)?.createdByMe ?? false;

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fetchDashboards = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { dashboards } = await dashboardsApi.getList({ size: 20 }); //TODO 추후 무한 스크롤 구현을 위한 임의의 size 설정
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
          createdByMe={createdByMe}
        />
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
