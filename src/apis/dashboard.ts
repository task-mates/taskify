import instance from "@/src/apis/instance";

export interface CreateDashboardRequest {
  title: string;
  color: string;
}

export interface UpdateDashboardRequest {
  title?: string;
  color?: string;
}

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface GetDashboardList {
  cursorId: number;
  totalCount: number;
  dashboards: Dashboard[];
}

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
