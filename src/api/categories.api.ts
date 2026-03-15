import { http } from "./http";
import { type Category } from '../shared/interfaces/categories';

export const CategoriesAPI = {
  async getAll(): Promise<Category[]> {
    const { data } = await http.get<Category[]>(`/category`)
    return data
  },
  create(data: Category) {
    return http.post('/category/create', data)
  },
  edit(id: string, data: Category) {
    return http.patch(`/category/edit/${id}`, data)
  }
};
