import { notFound } from 'next/navigation';
import DashboardEditView from './components/DashboardEditView';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DashboardEditPage({ params }: PageProps) {
  const { id } = await params;
  const dashboardId = Number(id);

  if (Number.isNaN(dashboardId)) {
    notFound();
  }

  return <DashboardEditView dashboardId={dashboardId} />;
}
