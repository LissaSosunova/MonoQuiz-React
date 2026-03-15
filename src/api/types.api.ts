import { http } from "./http";
import { type Type } from '../shared/interfaces/types';

export const TypesAPI = {
  async getAll(): Promise<Type[]> {
    const { data } = await http.get<Type[]>('/types')
    return data
  },
  create(data: Type) {
    return http.post('/types/create', data)
  },
  edit(id: string, data: Type) {
    return http.patch(`/types/edit/${id}`, data)
  }
};
