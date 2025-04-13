import { instance as axiosClient } from "../configs";
import { IGetPagingComment, IPostCommentRequest } from "../interfaces";

export const commentApi = {
    createComment: async (createComment: IPostCommentRequest) => {
        return await axiosClient.post('/comment/create', createComment);
    },
    deleteComment: async (id: string) => {
        const url = `/comment/delete/${id}`;
        return await axiosClient.delete(url);
    },
    getComment: async ({chapterId, ...rest}: IGetPagingComment) => {
        const queryString = new URLSearchParams(
            Object.entries(rest).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const url = `/comment/get/${chapterId}?${queryString}`;
        return await axiosClient.get(url);
    }
}