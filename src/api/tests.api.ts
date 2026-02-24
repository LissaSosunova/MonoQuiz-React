import { http } from "./http";

export const TestsAPI = {
  getAll() {
    return http.get(`/tests/all`);
  },
  create(data: any) {
    return http.post('/tests/create', data)
  },
};