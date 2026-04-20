import instance from "@/src/apis/instance";
import {
  CreateColumnRequest,
  UpdateColumnRequest,
  Column,
  GetColumnListResponse,
} from "@/src/apis/columns/type";

export const columnsApi = {
  create: async (body: CreateColumnRequest) => {
    const { data } = await instance.post<Column>("/columns", body);
    return data;
  },
  update: async (columnId: number, body: UpdateColumnRequest) => {
    const { data } = await instance.put<Column>(`/columns/${columnId}`, body);
    return data;
  },
  getList: async (dashboardId: number) => {
    const { data } = await instance.get<GetColumnListResponse>(`/columns`, {
      params: { dashboardId },
    });
    return data;
  },
};
