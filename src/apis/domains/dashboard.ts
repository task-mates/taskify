import instance from "@/src/apis/instance";
import {
  CreateDashboardRequest,
  Dashboard,
  GetDashboardList,
  UpdateDashboardRequest,
} from "@/src/apis/types";

export const dashboardsApi = {
  create: async (body: CreateDashboardRequest) => {
    const { data } = await instance.post<Dashboard>("/dashboards", body);
    return data;
  },
  getById: async (dashboardId: number) => {
    const { data } = await instance.get<Dashboard>(
      `/dashboards/${dashboardId}`,
    );
    return data;
  },
  getList: async () => {
    const { data } = await instance.get<GetDashboardList>("/dashboards");
    return data;
  },
  update: async (dashboardId: number, body: UpdateDashboardRequest) => {
    const { data } = await instance.put<Dashboard>(
      `/dashboards/${dashboardId}`,
      body,
    );
    return data;
  },
  delete: async (dashboardId: number) => {
    await instance.delete(`/dashboards/${dashboardId}`);
  },
};
