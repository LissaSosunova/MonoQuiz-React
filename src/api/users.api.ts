import { http } from "./http";

export const UsersAPI = {
  getAll() {
    return http.get("/users");
  },
};

export const UserAPI = {
  getUser() {
    return http.get("/users/user");
  },
};