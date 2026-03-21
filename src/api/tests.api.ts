import { http } from "./http"
import { type Test } from '../shared/interfaces/test'


export const TestsAPI = {
  getAll(category?: string): Promise<Test[]> {
    return http.get('/tests/all', {
      params: { category }
    }).then(res => res.data);
  },
  create(data: any) {
    return http.post('/tests/create', data)
  },
  update(id: string, data: any) {
    return http.put(`/tests/update/${id}`, data)
  },
  delete(id: string) {
    return http.put(`/tests/delete/${id}`)
  },
};