import { Link } from "react-router-dom"
import { CustomBreadcrumb } from "../../components"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../utils/constants"
import { Controller, useForm } from "react-hook-form"
import { Button, Form, Input } from "antd"
import { icons } from "../../utils/icons"

type LoginData = {
    email: string
    password: string
}

export const Login = () => {
    const items = [{title: <Link to="/">Trang chủ</Link>}, {title: "Đăng nhập"}]
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
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
                        Đăng nhập
                        <span className="absolute left-0 bottom-[-8px] w-1/6 h-1 bg-amber-600"></span>
                    </h3>
                    <Form className="flex flex-col gap-2 w-full mt-4" onFinish={handleSubmit(onSubmit)}>
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
                                    placeholder='Password'
                                    className='text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950'
                                    />
                                    <span className="text-red-500">{errors.password?.message}</span>
                                </>
                            )}
                        />
                        <div className="mb-2 text-right">
                            <Link to="/forgot-password" className="text-blue-800">Quên mật khẩu?</Link>
                            <Link to="/register" className="text-blue-800 ml-5">Đăng ký</Link>
                        </div>
                        <div className="flex flex-col gap-3 mb-4">
                            <Button
                                htmlType="submit"
                                className="bg-blue-800 text-white text-base p-2 rounded-none py-5"
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}