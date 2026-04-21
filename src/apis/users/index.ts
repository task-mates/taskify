import instance from "@/src/apis/instance";
import {
  SignUpRequest,
  UpdateMyInfoRequest,
  UploadProfileImageResponse,
  User,
} from "@/src/apis/users/type";

export const usersApi = {
  signUp: async (teamId: string | number, body: SignUpRequest) => {
    const { data } = await instance.post<User>(`/${teamId}/users`, body);
    return data;
  },

  getMe: async (teamId: string | number) => {
    const { data } = await instance.get<User>(`/${teamId}/users/me`);
    return data;
  },

  updateMe: async (
    teamId: string | number,
    body: UpdateMyInfoRequest,
  ) => {
    const { data } = await instance.put<User>(`/${teamId}/users/me`, body);
    return data;
  },

  uploadMyImage: async (teamId: string | number, image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    const { data } = await instance.post<UploadProfileImageResponse>(
      `/${teamId}/users/me/image`,
      formData,
    );
    return data;
  },
};
