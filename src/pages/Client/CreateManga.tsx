import { Button, Input, Checkbox, Select, message, Image } from "antd";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { convertToSlug, uploadToCloudinary } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { createMangaSchema } from "../../utils/constants";
import { useApi } from "../../hooks";
import { categoryApi, mangaApi } from "../../apis";
import {
  ICategory,
  ICategoryOption,
  ICreateMangaForm,
  ICreateMangaRequest,
} from "../../interfaces";
import { useAuthStore } from "../../utils/stores";
import { useNavigate } from "react-router-dom";

export const CreateManga = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const [categoryOptions, setCategoryOptions] = useState<ICategoryOption[]>([]);
  const { callApi: getCategories } = useApi<void>();
  const { loading, errorMessage, callApi: callMangaApis } = useApi<void>();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createMangaSchema),
    defaultValues: {
      categoryIds: [],
      name: "",
      description: "",
      coverImg: "",
      isDone: false,
    },
  });

  const handleGetCategoryOptions = (categories: ICategory[]) => {
    const options = categories.map((category) => ({
      label: category.name.charAt(0).toUpperCase() + category.name.slice(1),
      value: category.id,
    }));
    setCategoryOptions(options);
  };

  const onSubmit = async (createMangaRequest: ICreateMangaForm) => {
    await callMangaApis(async () => {
      const sendData: ICreateMangaRequest = {
        authorId: currentUser?.id || "",
        categoryIds: createMangaRequest.categoryIds,
        name: createMangaRequest.name,
        slug: convertToSlug(createMangaRequest.name),
        description: createMangaRequest.description,
        coverImg: createMangaRequest.coverImg,
        isDone: createMangaRequest.isDone || false,
      };
      const { data } = await mangaApi.createManga(sendData);
      if (data) {
        message.success(data.message, 3);
        navigate(`/manga/create-manga/${data.data.slug}`);
      }
    });
  };
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

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);
  return (
    <div className="max-w-2xl mx-auto p-6 my-6 rounded-md bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Sáng tác truyện</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <Button type="primary" htmlType="submit" loading={loading}>
          Đăng truyện
        </Button>
      </form>
    </div>
  );
};
