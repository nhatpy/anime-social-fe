import { ErrorCode } from "..";

export const errorResponseCases: Record<ErrorCode | string, string> = {
  Login: 'Vui lòng đăng nhập để sử dụng tính năng này!',
  All: 'Đã có lỗi xảy ra. Vui lòng kiểm tra lại'
}