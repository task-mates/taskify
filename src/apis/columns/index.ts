import instance from "@/src/apis/instance";
import {
  CreateColumnRequest,
  UpdateColumnRequest,
  Column,
  GetColumnListResponse,
  UploadCardImageResponse,
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
  uploadCardImage: async (columnId: number, image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await instance.post<UploadCardImageResponse>(
      `/columns/${columnId}/card-image`,
      formData,
    );
    return data;
  },
  delete: async (columnId: number) => {
    await instance.delete(`/columns/${columnId}`);
  },
  getList: async (dashboardId: number) => {
    const { data } = await instance.get<GetColumnListResponse>(`/columns`, {
      params: { dashboardId },
    });
    return data;
  },
};
