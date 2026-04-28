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

export type UpdateMyInfoRequest =
  | {
      nickname: string;
      profileImageUrl?: string | null;
    }
  | {
      nickname?: string;
      profileImageUrl: string | null;
    };

export interface UploadProfileImageResponse {
  profileImageUrl: string;
}

export interface UsersApiErrorResponse {
  message: string;
}
