import DashboardView from './components/DashboardView';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DashboardPage({ params }: PageProps) {
  const { id } = await params;
  const dashboardId = Number(id);

  return <DashboardView dashboardId={dashboardId} />;
}
