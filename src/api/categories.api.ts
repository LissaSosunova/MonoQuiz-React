import { http } from "./http";
import {type Category} from '../shared/interfaces/categories';

export const CategoriesAPI = {
  getAll() {
    return http.get(`/category`);
  },
  create(data: Category) {
    return http.post('/category/create', data)
  },
  edit(id: string, data: Category) {
    return http.patch(`/category/edit/${id}`, data)
  }
};
