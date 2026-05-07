import instance from "@/src/apis/instance";
import type { AxiosRequestConfig } from 'axios';
import {
   LoginRequest,
   LoginResponse,
   ResetPasswordRequest
  } from "@/src/apis/auth/type";

export const postLogin = async (data: LoginRequest, config?: AxiosRequestConfig): Promise<LoginResponse> => {
  const response = await instance.post<LoginResponse>('/auth/login', data, config);
  return response.data;
};

export const putPassword = async (data: ResetPasswordRequest, config?: AxiosRequestConfig): Promise<void> => {
  await instance.put('/auth/password', data, config);
};