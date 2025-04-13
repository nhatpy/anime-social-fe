import { instance as axiosClient } from "../configs";
import { ICreateCategoryRequest, IPaginationRequest, IUpdateCategoryRequest } from "../interfaces";

export const categoryApi = {
    getAll: async () => {
        return await axiosClient.get('/category/get-all');
    },
    createCategory: async (createCategory: ICreateCategoryRequest) => {
        return await axiosClient.post('/category/create', createCategory);
    },
    updateCategory: async ({id, ...request}: IUpdateCategoryRequest) => {
        return await axiosClient.patch(`/category/update/${id}`, request);
    },
    deleteCategory: async (id: string) => {
        return await axiosClient.delete(`/category/delete/${id}`);
    },
    getPagination: async (params: IPaginationRequest) => {
        const queryString = new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const url = `/category/get-paging?${queryString}`;

        return await axiosClient.get(url)
    }
}