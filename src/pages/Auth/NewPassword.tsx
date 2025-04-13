import { Button, Form, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { icons } from "../../utils/icons";
import { useApi } from "../../hooks";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authenticationApi } from "../../apis";
import { resetPasswordSchema } from "../../utils/constants";

export const NewPassword = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id") || "";
  const navigate = useNavigate();
  const { errorMessage, callApi: resetPassword } = useApi<void>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (formData: {
    password: string;
    confirmPassword: string;
  }) => {
    await resetPassword(async () => {
      const sendData = {
        userId: userId,
        newPassword: formData.password,
      };
      const { data } = await authenticationApi.resetPassword(sendData);
      if (data) {
        message.success(data.message, 3);
        reset();
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5 gap-5">
        <Form
          onFinish={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full mt-4"
        >
          <h3 className="text-2xl font-bold text-blue-800 relative uppercase mb-4">
            Đổi mật khẩu mới
            <span className="absolute left-0 bottom-[-8px] w-1/6 h-1 bg-amber-600"></span>
          </h3>
          <div className="w-full flex flex-col justify-center items-center">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <div className="w-full flex flex-col justify-center items-center">
                  <div className="flex flex-col w-1/3 gap-2">
                    <label
                      htmlFor="password"
                      className="text-base text-left font-medium text-red-600"
                    >
                      *Mật khẩu mới
                    </label>
                    <Input.Password
                      id="password"
                      prefix={icons.password}
                      {...field}
                      placeholder="Mật khẩu mới"
                      className="text-base w-full font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950"
                    />
                    <span className="text-red-500">
                      {errors.password?.message}
                    </span>
                  </div>
                </div>
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <div className="w-full flex flex-col justify-center items-center">
                  <div className="flex flex-col w-1/3 gap-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-base text-left font-medium text-red-600"
                    >
                      *Nhập lại mật khẩu mới
                    </label>
                    <Input.Password
                      id="confirmPassword"
                      prefix={icons.password}
                      {...field}
                      placeholder="Nhập lại mật khẩu mới"
                      className="text-base w-full font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950"
                    />
                    <span className="text-red-500">
                      {errors.confirmPassword?.message}
                    </span>
                  </div>
                </div>
              )}
            />
            <Button htmlType="submit" type="primary" className="w-[100px]">
              Đổi mật khẩu
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
