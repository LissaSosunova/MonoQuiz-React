import { http } from "./http";


export const ImagesAPI = {
    async getAll(): Promise<any[]> {
        const { data } = await http.get<any[]>(`/images`)
        return data
    },
    async getImage(id: string): Promise<any[]> {
        const { data } = await http.get<any>(`/images/${id}`)
        return data
    },
    create(data: any) {
        return http.post('/images/create', data)
    },

};