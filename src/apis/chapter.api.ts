import { instance as axiosClient } from "../configs";
import { ICreateChapterRequest, IRequestWithChapterNumber, IUpdateChapterRequest } from "../interfaces";

export const chapterApi = {
    createChapter: async ({mangaSlug, ...rest}: ICreateChapterRequest) => {
        const url = `/chapter/${mangaSlug}/create`;
        return await axiosClient.post(url, rest);
    },
    updateChapter: async ({chapterNumber, mangaSlug, ...rest}: IUpdateChapterRequest) => {
        const url = `/chapter/${mangaSlug}/update/${chapterNumber}`;
        return await axiosClient.patch(url, rest);
    },
    deleteChapter: async (deleteChapter: IRequestWithChapterNumber) => {
        const url = `/chapter/${deleteChapter.mangaSlug}/delete/${deleteChapter.chapterNumber}`;
        return await axiosClient.delete(url);
    },
    getByChapterNumber: async (getChapter: IRequestWithChapterNumber) => {
        const url = `/chapter/${getChapter.mangaSlug}/get/${getChapter.chapterNumber}`;
        return await axiosClient.get(url);
    }
}