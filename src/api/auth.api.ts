import { http } from "./http";

export const AuthAPI = {
  register(data: {
    email: string;
    password: string;
    role: "USER" | "ADMIN";
  }) {
    return http.post("/auth/register", data);
  },

  login(data: { email: string; password: string }) {
    return http.post("/auth/login", data);
  },
};
