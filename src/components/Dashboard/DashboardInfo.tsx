import { Button, Form, Image, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { uploadToCloudinary } from "../../utils/helpers";
import { useApi, useBoolean } from "../../hooks";
import { useEffect } from "react";
import { userApi } from "../../apis";
import { useAuthStore } from "../../utils/stores";
import { updateAvatarSchema } from "../../utils/constants";

export const DashboardInfo = () => {
  const { loading, errorMessage, callApi: updateAvatar } = useApi<void>();
  const { callApi: getCurrentUser } = useApi<void>();
  const { currentUser, setCurrentUser } = useAuthStore();
  const { value: isUserChanged, toggle: toggleUserChanged } = useBoolean(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(updateAvatarSchema),
    defaultValues: {
      avatar: currentUser?.avatar,
    },
  });

  const onSubmit = async (request: { avatar?: string }) => {
    await updateAvatar(async () => {
      const { data } = await userApi.updateUser({
        id: currentUser?.id || "",
        avatar: request.avatar,
      });
      if (data) {
        toggleUserChanged();
        message.success("Cập nhật thành công", 3);
      }
    });
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await getCurrentUser(async () => {
        const { data } = await userApi.currentUser();
        if (data) {
          setCurrentUser(data.data);
          reset({
            avatar: data.data.avatar,
          });
        }
      });
    };
    fetchCurrentUser();
  }, [isUserChanged]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-3xl font-bold text-blue-800">Thông tin tài khoản</h2>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-4 w-[45%]">
          <h4 className="text-xl text-[24px] font-[500] text-cyan-800">
            Thông tin cá nhân
          </h4>
          <div className="flex flex-col gap-4 mt-5 text-base text-[18px]">
            <div className="flex flex-row gap-5 items-center justify-between w-full">
              <p className="text-blue-700 w-[30%]">Gmail: </p>
              <Input
                size="large"
                disabled
                placeholder={`${currentUser?.email}`}
                className="w-[90%] placeholder-gray-600"
              />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
              <p className="text-blue-700 w-[30%]">Tên: </p>
              <Input
                size="large"
                disabled
                placeholder={`${currentUser?.fullName}`}
                className="w-[90%] placeholder-gray-600"
              />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
              <p className="text-blue-700 w-[30%]">Vi phạm: </p>
              <Input
                size="large"
                disabled
                placeholder={`${
                  currentUser?.isWarning ? "Đã bị cảnh cáo" : "Chưa bị cảnh cáo"
                }`}
                className="w-[90%] placeholder-red-700"
              />
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
                <p className="text-red-700 text-base">
                  Avatar không phù hợp sẽ bị cảnh cáo
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="file"
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
                      <span className="text-red-500">
                        {errors.avatar?.message}
                      </span>
                    </>
                  )}
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!isDirty}
                  loading={loading}
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
  );
};
