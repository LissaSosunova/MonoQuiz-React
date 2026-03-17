import { http } from "./http";


export const ImagesAPI = {
  async getAll(): Promise<any[]> {
      const { data } = await http.get<any[]>(`/images`)
      return data
    },
  create(data: any) {
    return http.post('/images/create', data)
  },
};