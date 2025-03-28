import { IPaginationRequest } from "."

export interface INotification {
    id: string,
    content: string,
    type: string,
    userId: string
}
export interface IGetNotificationRequest extends IPaginationRequest {
    userId: string
}