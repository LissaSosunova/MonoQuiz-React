import { http } from "./http";


export const TestsAPI = {
  async getAll(): Promise<any[]> {
      const { data } = await http.get<any[]>(`/tests/all`)
      return data
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