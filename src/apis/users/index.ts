import instance from "@/src/apis/instance";
import {
  SignUpRequest,
  UpdateMyInfoRequest,
  UploadProfileImageResponse,
  User,
} from "@/src/apis/users/type";

export const usersApi = {
  signUp: async (body: SignUpRequest) => {
    const { data } = await instance.post<User>("/users", body);
    return data;
  },

  getMe: async () => {
    const { data } = await instance.get<User>("/users/me");
    return data;
  },

  updateMe: async (body: UpdateMyInfoRequest) => {
    const { data } = await instance.put<User>("/users/me", body);
    return data;
  },

  uploadMyImage: async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    const { data } = await instance.post<UploadProfileImageResponse>(
      "/users/me/image",
      formData,
    );
    return data;
  },
};
