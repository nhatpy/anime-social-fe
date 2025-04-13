import { instance as axiosClient } from "../configs";

export const mangaInteractionApi = {
    interaction: async (mangaId: string) => {
        return await axiosClient.patch(`/interaction/${mangaId}`);
    }
}