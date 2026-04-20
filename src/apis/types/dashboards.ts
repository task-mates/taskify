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
