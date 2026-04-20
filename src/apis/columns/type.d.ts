export interface CreateColumnRequest {
  title: string;
  dashboardId: number;
}

export interface Column {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetColumnListResponse {
  result: "SUCCESS";
  data: Column[];
}
