import { instance as axiosClient } from "../configs";
import { IPayment } from "../interfaces";

export const paymentApi = {
    donate: async (paymentRequest: IPayment) => {
        return await axiosClient.post('/payment/momo', paymentRequest);
    },
    callback: async (callbackParams: Map<string, string>) => {
        const queryString = new URLSearchParams(
            Array.from(callbackParams.entries()).reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const url = `/payment/callback?${queryString}`;
        return await axiosClient.get(url);
    }
}