export interface LoginRequest 
{
  email: string;
  password: string;
}

export interface LoginResponse 
{
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

export interface PasswordRequest
{
  "password": "string",
  "newPassword": "string"
}

