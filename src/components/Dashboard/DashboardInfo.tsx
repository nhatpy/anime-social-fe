import { Button, Form, Image, Input } from "antd"
import { uploadToCloudinary } from "../../utils/helpers";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { icons } from "../../utils/icons";

const schema = yup.object().shape({
  avatar: yup.string().url("Hình ảnh không hợp lệ")
});

export const DashboardInfo = () => {
  const {
      control,
      handleSubmit,
      formState: { errors, isDirty },
      watch,
  } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
          avatar: "",
      }
  })
  
  const onSubmit = (data: { avatar?: string }) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-3xl font-bold text-blue-800">
        Thông tin tài khoản
      </h2>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-4 w-[45%]">
          <h4 className="text-xl text-[24px] font-[500] text-cyan-800">
            Thông tin cá nhân
          </h4>
          <div className="flex flex-col gap-4 mt-5 text-base text-[18px]">
            <div className="flex flex-row gap-5 items-center justify-between w-full">
              <p className="text-blue-700 w-[30%]">Gmail: </p> 
              <Input size="large" disabled placeholder="dolongnhat0301@gmail.com" className="w-[90%] placeholder-gray-600"/>
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
              <p className="text-blue-700 w-[30%]">Tên: </p> 
              <Input size="large" disabled placeholder="Đỗ Long Nhật" className="w-[90%] placeholder-gray-600"/>
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
              <p className="text-blue-700 w-[30%]">Vi phạm: </p> 
              <Input size="large" disabled placeholder="Đã bị cảnh cáo" className="w-[90%] placeholder-red-700"/>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[45%]">
          <h4 className="text-xl text-[24px] font-[500] text-cyan-800">
            Avatar
          </h4>
          <div className="flex flex-row items-center space-y-3 gap-5">
            <Form onFinish={handleSubmit(onSubmit)}>
              <div className="flex flex-row gap-5 mb-5">
                <Image
                  width={100}
                  height={100}
                  src={watch("avatar") || "/assets/avatar.png"}
                  className="border border-gray-300 rounded-full"
                />
                <p className="text-red-700 text-base">Avatar không phù hợp sẽ bị cảnh cáo</p>
              </div>
              <div className="flex flex-col gap-2">
                <Controller 
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="file"
                        style={{ display: "none" }}
                        id="avatar-upload"
                        onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const url = await uploadToCloudinary(file);
                          if (url) {
                            field.onChange(url);
                          }
                        }
                        }}
                      />
                      <label htmlFor="avatar-upload">
                      <Button
                        className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
                      >
                        {icons.upload}
                        Chọn ảnh
                      </Button>
                    </label>
                      <span className="text-red-500">{errors.avatar?.message}</span>
                    </>
                  )}
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!isDirty}
                  className="text-base w-fit"
                >
                  Cập nhật
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
