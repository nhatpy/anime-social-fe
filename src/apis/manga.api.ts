import { instance as axiosClient } from "../configs";
import { IBulkActiveRequest, ICreateMangaRequest, IGetMangaByAuthorIdRequest, IGetMangaPaginationRequest, IUpdateMangaRequest } from "../interfaces";

export const mangaApi = {
    createManga: async (createManga: ICreateMangaRequest) => {
        return await axiosClient.post('/manga/create', createManga);
    },
    updateManga: async ({slug, ...rest}: IUpdateMangaRequest) => {
        return await axiosClient.patch(`/manga/update/${slug}`, rest);
    },
    deleteManga: async (slug: string) => {
        return await axiosClient.delete(`/manga/delete/${slug}`);
    },
    getBySlug: async (slug: string) => {
        return await axiosClient.get(`/manga/get/${slug}`);
    },
    bulkActive: async (bulkActiveRequest: IBulkActiveRequest) => {
        return await axiosClient.post('/manga/bulk-active', bulkActiveRequest);
    },
    getPagination: async (params: IGetMangaPaginationRequest) => {
        const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          if (typeof value !== "number" && !value) return acc;
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString();
        const url = `manga/get/get-paging?${queryString}`;
        return await axiosClient.get(url);
    },
    getMangaByAuthorId: async ({authorId, ...params}: IGetMangaByAuthorIdRequest) => {
        const queryString = new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const url = `manga/get/get-by-author/${authorId}?${queryString}`;
        return await axiosClient.get(url); 
    },
    getTopDayManga: async () => {
        return await axiosClient.get('/manga/get/get-top-manga')
    }
}