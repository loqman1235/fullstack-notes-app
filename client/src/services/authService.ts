import { User } from "../features/slices/authSlice";
import api from "./api";

interface LoginResponse<T> {
  success: boolean;
  data: T;
  token?: string;
}

const authService = {
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse<User>> => {
    const { data, status } = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(data?.data));

    if (status !== 200) {
      throw new Error("Failed to login");
    }

    return data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("user");
    await api.post("/auth/logout");
  },
};

export default authService;
