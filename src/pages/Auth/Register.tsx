import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { registerSchema } from "../../utils/constants"
import { CustomBreadcrumb } from "../../components"
import { Button, Form, Input } from "antd"
import { icons } from "../../utils/icons"

type LoginData = {
    fullName: string,
    email: string
    password: string
    confirmPassword: string
    phoneNumber: string
}

export const Register = () => {
    const items = [{title: <Link to="/">Trang chủ</Link>}, {title: "Đăng ký"}]
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    })

    const onSubmit = (data: LoginData) => {
        console.log(data)
        reset()
    }
    
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5 gap-5">
                <div className="flex items-start justify-start w-full">
                    <CustomBreadcrumb items={items}/>
                </div>
                <div className="flex flex-col justify-center w-[40%] gap-2 h-full">
                    <h3 className="text-2xl font-bold text-blue-800 relative uppercase">
                        Đăng ký
                        <span className="absolute left-0 bottom-[-8px] w-1/6 h-1 bg-amber-600"></span>
                    </h3>
                    <Form className="flex flex-col gap-2 w-full mt-4" onFinish={handleSubmit(onSubmit)}>
                        <Controller
                            name='fullName'
                            control={control}
                            render={({ field }) => (
                                <>
                                    <label htmlFor="email" className="text-base font-medium text-red-600">*Họ và tên</label>
                                    <Input
                                    id="email"
                                    prefix={icons.user}
                                    {...field}
                                    placeholder='Họ và tên'
                                    className='text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950'
                                    />
                                    <span className="text-red-500">{errors.fullName?.message}</span>
                                </>
                            )}
                        />
                        <Controller
                            name='phoneNumber'
                            control={control}
                            render={({ field }) => (
                                <>
                                    <label htmlFor="email" className="text-base font-medium text-red-600">*Số điện thoại</label>
                                    <Input
                                    id="email"
                                    prefix={icons.phone}
                                    {...field}
                                    placeholder='Số điện thoại'
                                    className='text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950'
                                    />
                                    <span className="text-red-500">{errors.phoneNumber?.message}</span>
                                </>
                            )}
                        />
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => (
                                <>
                                    <label htmlFor="email" className="text-base font-medium text-red-600">*Email</label>
                                    <Input
                                    id="email"
                                    prefix={icons.create}
                                    {...field}
                                    placeholder='Email'
                                    className='text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950'
                                    />
                                    <span className="text-red-500">{errors.email?.message}</span>
                                </>
                            )}
                        />
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => (
                                <>
                                    <label htmlFor="password" className="text-base font-medium text-red-600">*Mật khẩu</label>
                                    <Input.Password
                                    id="password"
                                    prefix={icons.password}
                                    {...field}
                                    placeholder='Mật khẩu'
                                    className='text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950'
                                    />
                                    <span className="text-red-500">{errors.password?.message}</span>
                                </>
                            )}
                        />
                        <Controller
                            name='confirmPassword'
                            control={control}
                            render={({ field }) => (
                                <>
                                    <label htmlFor="password" className="text-base font-medium text-red-600">*Nhập lại mật khẩu</label>
                                    <Input.Password
                                    id="password"
                                    prefix={icons.password}
                                    {...field}
                                    placeholder='Nhập lại mật khẩu'
                                    className='text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950'
                                    />
                                    <span className="text-red-500">{errors.confirmPassword?.message}</span>
                                </>
                            )}
                        />
                        <div className="mb-2 text-right">
                            <Link to="/login" className="text-blue-800 ml-5">Đăng nhập</Link>
                        </div>
                        <div className="flex flex-col gap-3 mb-4">
                            <Button
                                htmlType="submit"
                                className="bg-blue-800 text-white text-base p-2 rounded-none py-5"
                            >
                                Đăng ký
                            </Button>
                            <Button
                                className="bg-red-600 text-white text-base p-2 rounded-none py-5 
                                hover:!border-red-800 focus-within:!border-red-800 focus-within:!shadow-red-800 hover:!text-red-800
                                gap-5"
                            >
                                <span>{icons.google}</span>
                                Đăng nhập bằng Google
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}