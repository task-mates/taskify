import instance from '@/src/apis/instance';
import {
  CreateDashboardRequest,
  Dashboard,
  GetDashboardListRequest,
  GetDashboardListResponse,
  UpdateDashboardRequest,
} from '@/src/apis/dashboards/type';

export const createDashboard = async (body: CreateDashboardRequest) => {
  const { data } = await instance.post<Dashboard>('/dashboards', body);
  return data;
};

export const getDashboardById = async (dashboardId: number) => {
  const { data } = await instance.get<Dashboard>(`/dashboards/${dashboardId}`);
  return data;
};

export const getDashboardList = async (params: GetDashboardListRequest) => {
  const { data } = await instance.get<GetDashboardListResponse>('/dashboards', {
    params: {
      navigationMethod: 'infiniteScroll',
      ...params,
    },
  });
  return data;
};

export const updateDashboard = async (
  dashboardId: number,
  body: UpdateDashboardRequest
) => {
  const { data } = await instance.put<Dashboard>(
    `/dashboards/${dashboardId}`,
    body
  );
  return data;
};

export const removeDashboard = async (dashboardId: number) => {
  await instance.delete(`/dashboards/${dashboardId}`);
};
