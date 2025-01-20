import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Vui lòng nhật email"),
    password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu")
})