import instance from "@/src/apis/instance";
import {
   LoginRequest,
   LoginResponse,
   ResetPasswordRequest
  } from "@/src/apis/auth/type";

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await instance.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const putPassword = async (data: ResetPasswordRequest): Promise<void> => {
  await instance.put('/auth/password', data);
};