import instance from "@/src/apis/instance";
import {
   LoginRequest,
   LoginResponse,
   ResetPasswordRequest
  } from "@/src/apis/auth/type";

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await instance.post<LoginResponse>(`/login`, data);
  return response.data;
};

export const putResetPassword = async (data: ResetPasswordRequest): Promise<void> => {
  const response = await instance.put(`/password`, data);
  return response.data;
};