import { http } from "./http";
import { type User } from '../shared/interfaces/User';

export const UsersAPI = {
  getAll() {
    return http.get<User[]>("/users");
  },
  getUser() {
    return http.get<User>("/users/user");
  },
};