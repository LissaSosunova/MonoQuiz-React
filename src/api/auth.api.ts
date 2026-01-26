import { http } from "./http";

export const AuthAPI = {
  register(data: {
    email: string;
    password: string;
    name: string;
    role: "USER" | "ADMIN" | "user" | "admin";
  }) {
    return http.post("/users/register", data);
  },

  login(data: { email: string; password: string }) {
    return http.post("/auth/login", data);
  },
};
