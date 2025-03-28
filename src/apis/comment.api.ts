import { instance as axiosClient } from "../configs";
import { IPostCommentRequest, IUpdateCommentRequest } from "../interfaces";

export const commentApi = {
    createComment: async (createComment: IPostCommentRequest) => {
        return await axiosClient.post('/comment/create', createComment);
    },
    deleteComment: async (id: string) => {
        const url = `/comment/delete/${id}`;
        return await axiosClient.delete(url);
    },
    updateComment: async ({id, ...rest}: IUpdateCommentRequest) => {
        const url = `/comment/update/${id}`;
        return await axiosClient.patch(url, rest);
    }
}