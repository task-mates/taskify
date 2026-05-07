import instance from '@/src/apis/instance';
import type { AxiosRequestConfig } from 'axios';
import {
  SignUpRequest,
  UpdateMyInfoRequest,
  UploadProfileImageResponse,
  User,
} from '@/src/apis/users/type';

export const usersApi = {
  signUp: async (body: SignUpRequest, config?: AxiosRequestConfig) => {
    const { data } = await instance.post<User>('/users', body, config);
    return data;
  },

  getMe: async () => {
    const { data } = await instance.get<User>('/users/me');
    return data;
  },

  updateMe: async (body: UpdateMyInfoRequest, config?: AxiosRequestConfig) => {
    const { data } = await instance.put<User>('/users/me', body, config);
    return data;
  },

  uploadMyImage: async (image: File, config?: AxiosRequestConfig) => {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await instance.post<UploadProfileImageResponse>(
      '/users/me/image',
      formData,
      config
    );
    return data;
  },
};
