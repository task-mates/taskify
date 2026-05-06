import { notFound } from 'next/navigation';
import DashboardView from './components/DashboardView';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DashboardPage({ params }: PageProps) {
  const { id } = await params;
  const dashboardId = Number(id);

  if (Number.isNaN(dashboardId)) {
    notFound();
  }

  return <DashboardView dashboardId={dashboardId} />;
}
