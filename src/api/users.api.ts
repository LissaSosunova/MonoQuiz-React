import { http } from "./http";
import { type User } from '../shared/interfaces/User';

export const UsersAPI = {
  getAll() {
    return http.get<User[]>("/users");
  },
  getUser() {
    return http.get<User>("/users/user");
  },
  updateRole(id: string, role: string) {
    return http.patch<User>(`/users/changerole/${id}/role`, {role});
  },
  updateActive(id: string, isActive: boolean) {
    return http.patch<User>(`/users/changevisibility/${id}/isActive`, { isActive});
  }
};