import * as yup from 'yup';

const phoneRegExp = /0+([0-9]{9})\b/;

export const registerSchema = yup.object().shape({
    fullName: yup.string().required('Vui lòng nhập họ và tên'),
    email: yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email!'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu!'),
    confirmPassword: yup
        .string()
        .required('Vui lòng nhập mật khẩu!')
        .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp!'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ!').required('Vui lòng nhập số điện thoại!'),
});