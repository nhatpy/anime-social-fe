import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Vui lòng nhật email"),
    password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu")
})

export const registerSchema = yup.object().shape({
    fullName: yup.string().required('Vui lòng nhập họ và tên'),
    email: yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email!'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu!'),
    confirmPassword: yup
        .string()
        .required('Vui lòng nhập mật khẩu!')
        .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp!'),
});

export const updateAvatarSchema = yup.object().shape({
  avatar: yup.string().url("Hình ảnh không hợp lệ"),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu!"),
  newPassword: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu!")
    .notOneOf(
      [yup.ref("currentPassword")],
      "Mật khẩu mới không được giống mật khẩu hiện tại!"
    ),
  confirmPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu!")
    .oneOf([yup.ref("newPassword")], "Nhập lại mật khẩu không khớp!"),
});

export const emailVerifySchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu!"),
  confirmPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu!")
    .oneOf([yup.ref("password")], "Nhập lại mật khẩu không khớp!"),
});