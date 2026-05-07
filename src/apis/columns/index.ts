import instance from '@/src/apis/instance';
import type { AxiosRequestConfig } from 'axios';
import {
  CreateColumnRequest,
  UpdateColumnRequest,
  Column,
  GetColumnListResponse,
  UploadCardImageResponse,
} from '@/src/apis/columns/type';

export const columnsApi = {
  create: async (body: CreateColumnRequest, config?: AxiosRequestConfig) => {
    const { data } = await instance.post<Column>('/columns', body, config);
    return data;
  },
  update: async (columnId: number, body: UpdateColumnRequest, config?: AxiosRequestConfig) => {
    const { data } = await instance.put<Column>(`/columns/${columnId}`, body, config);
    return data;
  },
  uploadCardImage: async (columnId: number, image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    const { data } = await instance.post<UploadCardImageResponse>(
      `/columns/${columnId}/card-image`,
      formData
    );
    return data;
  },
  remove: async (columnId: number) => {
    await instance.delete(`/columns/${columnId}`);
  },
  getList: async (dashboardId: number) => {
    const { data } = await instance.get<GetColumnListResponse>(`/columns`, {
      params: { dashboardId },
    });
    return data;
  },
};
