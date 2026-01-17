import { http } from "./http";

export const UsersAPI = {
  getAll() {
    return http.get("/users");
  },
};
