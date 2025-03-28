import { instance as axiosClient } from "../configs";
import { ICreateChapterRequest, IRequestWithChapterNumber, IUpdateChapterRequest } from "../interfaces";

export const chapterApi = {
    createChapter: async ({mangaId, ...rest}: ICreateChapterRequest) => {
        const url = `/chapter/${mangaId}/create`;
        return await axiosClient.post(url, rest);
    },
    updateChapter: async ({formerChapterNumber, mangaId, ...rest}: IUpdateChapterRequest) => {
        const url = `/chapter/${mangaId}/update/${formerChapterNumber}`;
        return await axiosClient.patch(url, rest);
    },
    deleteChapter: async (deleteChapter: IRequestWithChapterNumber) => {
        const url = `/chapter/${deleteChapter.mangaId}/delete/${deleteChapter.chapterNumber}`;
        return await axiosClient.delete(url);
    },
    getByChapterNumber: async (getChapter: IRequestWithChapterNumber) => {
        const url = `/chapter/${getChapter.mangaId}/get/${getChapter.chapterNumber}`;
        return await axiosClient.get(url);
    }
}