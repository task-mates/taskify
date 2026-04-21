export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface UpdateMyInfoRequest {
  nickname: string;
  profileImageUrl: string;
}

export interface UploadProfileImageResponse {
  profileImageUrl: string;
}

export interface UsersApiErrorResponse {
  message: string;
}
