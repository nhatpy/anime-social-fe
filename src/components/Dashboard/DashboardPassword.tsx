import { 
  Button, 
  Form, 
  Input 
} from "antd"
import { 
  Controller, 
  useForm 
} from "react-hook-form"
import * as yup from "yup"

import { yupResolver } from "@hookform/resolvers/yup"

import { icons } from "../../utils/icons"

type ChangePasswordData = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const schema = yup.object().shape({
  currentPassword: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu!'),
  newPassword: yup
    .string()
    .min(6, 'Mật khẩu ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu!')
    .notOneOf([yup.ref('currentPassword')], 'Mật khẩu mới không được giống mật khẩu hiện tại!'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu!')
    .oneOf([yup.ref('newPassword')], 'Nhập lại mật khẩu không khớp!'),
})

export const DashboardPassword = () => {
  const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
  } = useForm({
      resolver: yupResolver(schema),
  })

  const onSubmit = (data: ChangePasswordData) => {
      console.log(data)
      reset()
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-3xl font-bold text-blue-800">
        Đổi mật khẩu
      </h2>
        <div className="flex flex-col gap-4 w-full">
          <p className="italic text-sm text-[16px]">Mật khẩu cần đảm bảo bảo mật để bảo vệ tài khoản của bạn.</p>
            <Form onFinish={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
              <Controller
                name='currentPassword'
                control={control}
                render={({ field }) => (
                  <>
                    <label htmlFor="currentPassword" className="text-base font-medium text-red-600">*Mật khẩu hiện tại</label>
                    <Input.Password
                    id="currentPassword"
                    prefix={icons.password}
                    {...field}
                    placeholder='Mật khẩu hiện tại'
                    className='w-[35%] text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950'
                    />
                    <span className="text-red-500">{errors.currentPassword?.message}</span>
                  </>
                )}
              />
              <Controller
                name='newPassword'
                control={control}
                render={({ field }) => (
                  <>
                      <label htmlFor="newPassword" className="text-base font-medium text-red-600">*Mật khẩu mới</label>
                      <Input.Password
                      id="newPassword"
                      prefix={icons.password}
                      {...field}
                      placeholder='Mật khẩu mới'
                      className='w-[35%] text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950'
                      />
                      <span className="text-red-500">{errors.newPassword?.message}</span>
                  </>
                )}
              />
              <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                  <>
                      <label htmlFor="confirmPassword" className="text-base font-medium text-red-600">*Nhập lại mật khẩu mới</label>
                      <Input.Password
                      id="confirmPassword"
                      prefix={icons.password}
                      {...field}
                      placeholder='Nhập lại mật khẩu mới'
                      className='w-[35%] text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950'
                      />
                      <span className="text-red-500">{errors.confirmPassword?.message}</span>
                  </>
                )}
              />
              <Button htmlType="submit" type="primary" className="text-sm text-[16px] font-medium p-5 w-fit">
                Đổi mật khẩu
              </Button>
            </Form>
        </div>
    </div>
  )
}
