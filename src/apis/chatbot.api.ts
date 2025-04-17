import { instance as axiosClient } from "../configs";
import { IChatbotRequest } from "../interfaces/chatbot.interface";

export const chatbotApi = {
    getChatHistory: async (userId: string) => {
        const url = `/chatbot/get-history/${userId}`;
        return await axiosClient.get(url);
    },
    sendMessage: async (payload: IChatbotRequest) => {
        const url = `/chatbot/send-message`;
        return await axiosClient.post(url, payload);
    },
}