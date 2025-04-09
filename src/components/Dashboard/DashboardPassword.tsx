import { Button, Form, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { icons } from "../../utils/icons";
import { useApi } from "../../hooks";
import { useEffect } from "react";
import { authenticationApi } from "../../apis";
import { useAuthStore } from "../../utils/stores";
import { changePasswordSchema } from "../../utils/constants";

type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const DashboardPassword = () => {
  const { currentUser } = useAuthStore();
  const { loading, errorMessage, callApi: changePassword } = useApi<void>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (submitData: ChangePasswordData) => {
    await changePassword(async () => {
      const sendData = {
        userId: currentUser?.id || "",
        currentPassword: submitData.currentPassword,
        newPassword: submitData.newPassword,
      };
      const { data } = await authenticationApi.changePassword(sendData);
      if (data) {
        message.success("Đổi mật khẩu thành công!", 3);
        reset();
      }
    });
  };

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-3xl font-bold text-blue-800">Đổi mật khẩu</h2>
      <div className="flex flex-col gap-4 w-full">
        <p className="italic text-sm text-[16px]">
          Mật khẩu cần đảm bảo bảo mật để bảo vệ tài khoản của bạn.
        </p>
        <Form
          onFinish={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <>
                <label className="text-base font-medium text-red-600">
                  *Mật khẩu hiện tại
                </label>
                <Input.Password
                  prefix={icons.password}
                  {...field}
                  placeholder="Mật khẩu hiện tại"
                  className="w-[35%] text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950"
                />
                <span className="text-red-500">
                  {errors.currentPassword?.message}
                </span>
              </>
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <>
                <label className="text-base font-medium text-red-600">
                  *Mật khẩu mới
                </label>
                <Input.Password
                  prefix={icons.password}
                  {...field}
                  placeholder="Mật khẩu mới"
                  className="w-[35%] text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950"
                />
                <span className="text-red-500">
                  {errors.newPassword?.message}
                </span>
              </>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <>
                <label className="text-base font-medium text-red-600">
                  *Nhập lại mật khẩu mới
                </label>
                <Input.Password
                  prefix={icons.password}
                  {...field}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-[35%] text-base font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950"
                />
                <span className="text-red-500">
                  {errors.confirmPassword?.message}
                </span>
              </>
            )}
          />
          <Button
            htmlType="submit"
            type="primary"
            className="text-sm text-[16px] font-medium p-5 w-fit"
            loading={loading}
          >
            Đổi mật khẩu
          </Button>
        </Form>
      </div>
    </div>
  );
};
