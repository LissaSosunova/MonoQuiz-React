import { http } from "./http";


export const TestsAPI = {
  async getAll(): Promise<any[]> {
      const { data } = await http.get<any[]>(`/tests/all`)
      return data
    },
  create(data: any) {
    return http.post('/tests/create', data)
  },
};