import React, { useEffect } from "react";
import { ICategory, ICategoryForm } from "../interfaces";
import { Button, Input, message, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApi } from "../hooks";
import { createCategorySchema } from "../utils/constants";
import { categoryApi } from "../apis";
import { convertToSlug } from "../utils/helpers";

type UpdateCategoryModalProps = {
  isOpen: boolean;
  handleCancel: () => void;
  category: ICategory;
  toggleChanged: () => void;
};

export const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  isOpen,
  handleCancel,
  category,
  toggleChanged,
}) => {
  const { errorMessage, loading, callApi: callCategoryApis } = useApi<void>();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(createCategorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  const handleUpdateCategory = async (request: ICategoryForm) => {
    await callCategoryApis(async () => {
      const sendData = {
        id: category.id,
        slug: convertToSlug(request.name),
        ...request,
      };
      const { data } = await categoryApi.updateCategory(sendData);
      if (data) {
        toggleChanged();
        handleCancel();
        message.success(data.message, 3);
      }
    });
  };

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (category && isOpen) {
      reset({
        name: category.name,
        description: category.description,
      });
    }
  }, [category, isOpen, reset]);
  return (
    <Modal
      title={<span className="text-xl font-semibold">Thêm danh mục</span>}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width={600}
    >
      <form
        onSubmit={handleSubmit(handleUpdateCategory)}
        className="flex flex-col gap-4 mt-6"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-red-700 font-medium mb-2">
                Tên danh mục*
              </label>
              <Input
                {...field}
                placeholder="Nhập tên danh mục"
                className="h-10"
              />
              <span className="text-red-500">{errors.name?.message}</span>
            </div>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-red-700 font-medium mb-2">
                Mô tả*
              </label>
              <Input.TextArea
                {...field}
                rows={4}
                placeholder="Nhập mô tả"
                className="resize-none"
              />
              <span className="text-red-500">
                {errors.description?.message}
              </span>
            </div>
          )}
        />

        <div className="flex gap-3 justify-end mt-4">
          <Button
            onClick={handleCancel}
            className="h-10 px-6 border-gray-300 hover:border-blue-500"
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="h-10 px-6 bg-blue-600 hover:bg-blue-700"
            loading={loading}
            disabled={!isDirty}
          >
            Cập nhật danh mục
          </Button>
        </div>
      </form>
    </Modal>
  );
};
