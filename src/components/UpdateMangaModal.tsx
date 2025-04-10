import React, { useEffect, useState } from "react";
import {
  ICategory,
  ICategoryOption,
  ICreateMangaForm,
  IManga,
  IUpdateMangaRequest,
} from "../interfaces";
import { Button, Checkbox, Input, message, Modal, Image, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApi } from "../hooks";
import { createMangaSchema } from "../utils/constants";
import { categoryApi, mangaApi } from "../apis";
import { convertToSlug, uploadToCloudinary } from "../utils/helpers";

type UpdateMangaModalProps = {
  isOpen: boolean;
  handleCancel: () => void;
  manga: IManga;
  toggleChanged: () => void;
};

export const UpdateMangaModal: React.FC<UpdateMangaModalProps> = ({
  isOpen,
  handleCancel,
  manga,
  toggleChanged,
}) => {
  const { errorMessage, loading, callApi: callMangaApis } = useApi<void>();
  const { callApi: getCategories } = useApi<void>();
  const [categoryOptions, setCategoryOptions] = useState<ICategoryOption[]>([]);
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(createMangaSchema),
    defaultValues: {
      name: manga.name,
      description: manga.description,
      coverImg: manga.coverImage,
      isDone: manga.isDone,
      categoryIds: manga.categories.map((category) => category.value),
    },
  });

  const handleGetCategoryOptions = (categories: ICategory[]) => {
    const options = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));
    setCategoryOptions(options);
  };

  const handleUpdateManga = async (request: ICreateMangaForm) => {
    await callMangaApis(async () => {
      const sendData: IUpdateMangaRequest = {
        slug: convertToSlug(request.name),
        description: request.description,
        coverImg: request.coverImg,
        isDone: request.isDone || false,
      };
      const { data } = await mangaApi.updateManga(sendData);
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
    if (manga && isOpen) {
      reset({
        name: manga.name,
        description: manga.description,
        coverImg: manga.coverImage,
        isDone: manga.isDone,
        categoryIds: manga.categories.map((category) => category.value),
      });
    }
  }, [manga, isOpen, reset]);

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories(async () => {
        const { data } = await categoryApi.getAll();
        if (data) {
          handleGetCategoryOptions(data.data);
        }
      });
    };
    fetchCategories();
  }, []);

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
        onSubmit={handleSubmit(handleUpdateManga)}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="font-semibold">Thể loại</label>
          <Controller
            name="categoryIds"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                placeholder="Chọn thể loại"
                options={categoryOptions}
                onChange={(selected) => field.onChange(selected)}
                className="w-full mt-1"
                disabled={true}
              />
            )}
          />
          {errors.categoryIds && (
            <p className="text-red-500 text-sm">{errors.categoryIds.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Tên truyện</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập tên truyện"
                className="mt-1"
                disabled={true}
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Mô tả</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={4}
                placeholder="Nhập mô tả"
                className="mt-1"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold mr-4">Ảnh bìa</label>
          <Image
            width={100}
            height={100}
            src={watch("coverImg") || "/assets/avatar.png"}
            className="border border-gray-300 rounded-full"
          />
          <Controller
            name="coverImg"
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
                <span className="text-red-500">{errors.coverImg?.message}</span>
              </>
            )}
          />
        </div>
        <div>
          <Controller
            name="isDone"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                Truyện đã hoàn thành
              </Checkbox>
            )}
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Cập nhật truyện
        </Button>
      </form>
    </Modal>
  );
};
