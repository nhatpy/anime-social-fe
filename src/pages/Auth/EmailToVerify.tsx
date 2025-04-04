import { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { icons } from "../../utils/icons";
import { useApi } from "../../hooks";
import { IVerifyEmailRequest } from "../../interfaces";
import { authenticationApi } from "../../apis";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
});

export const EmailToVerify = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { errorMessage, callApi: sendVerifyEmail } = useApi<void>();

  useEffect(() => {
    if (isDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isDisabled]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (verifyEmailRequest: IVerifyEmailRequest) => {
    await sendVerifyEmail(async () => {
      const { data } = await authenticationApi.verifyEmail(verifyEmailRequest);
      if (data) {
        message.success(data.message, 3);
        setIsDisabled(true);
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
            Xác nhận email
            <span className="absolute left-0 bottom-[-8px] w-1/6 h-1 bg-amber-600"></span>
          </h3>
          <div className="w-full flex flex-col justify-center items-center">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <div className="w-full flex flex-col justify-center items-center">
                  <div className="flex flex-col w-1/3 gap-2">
                    <label
                      htmlFor="email"
                      className="text-base text-left font-medium text-red-600"
                    >
                      *Email
                    </label>
                    <Input
                      id="email"
                      prefix={icons.create}
                      {...field}
                      placeholder="Email"
                      className="text-base w-full font-medium border-1 border-gray-400 rounded-md p-2 hover:!border-blue-950 focus-within:!border-blue-950 focus-within:!shadow-blue-950"
                    />
                    <span className="text-red-500">
                      {errors.email?.message}
                    </span>
                  </div>
                </div>
              )}
            />
            <Button
              htmlType="submit"
              disabled={isDisabled}
              type="primary"
              className="w-[100px]"
            >
              {isDisabled ? `Chờ ${countdown}s` : "Gửi xác nhận"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
