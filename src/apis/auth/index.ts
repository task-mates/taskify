import instance from "@/src/apis/instance";
import {
   LoginRequest,
   LoginResponse,
   PasswordRequest
  } from "@/src/apis/auth/type";

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await instance.post<LoginResponse>(`/login`, data);
  return response.data;
};

export const putPassword = async (data: PasswordRequest) => {
  const response = await instance.put(`/password`, data);
  return response.data; 
};