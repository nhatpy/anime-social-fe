import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createChapterSchema } from "../../utils/constants";
import { uploadToCloudinary } from "../../utils/helpers";
import { useApi, useBoolean } from "../../hooks";
import {
  IChapter,
  IChapterFormData,
  IRequestWithChapterNumber,
  IUpdateChapterRequest,
} from "../../interfaces";
import { chapterApi } from "../../apis";
import { Button, Input, message } from "antd";
import { icons } from "../../utils/icons";

export const ChapterCreateDetail = () => {
  const { "manga-slug": slug, "chapter-number": chapterNumber } = useParams();
  const { loading, errorMessage, callApi: callChapterApis } = useApi<void>();
  const [uploading, setUploading] = useState(false);
  const [chapter, setChapter] = useState<IChapter | null>(null);
  const { value: isChapterChanged, toggle: toggleChapterChanged } =
    useBoolean(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(createChapterSchema),
    defaultValues: {
      chapterNumber: chapterNumber ? Number(chapterNumber) : 0,
      images: chapter ? chapter.content : [],
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploading(true);
      const files = Array.from(e.target.files);
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const url = await uploadToCloudinary(file);
          return url;
        })
      );
      setValue(
        "images",
        [...watch("images"), ...uploadedImages.filter((url) => url)],
        { shouldDirty: true }
      );
      setUploading(false);
    }
  };
  const removeImage = (index: number) => {
    setValue(
      "images",
      watch("images").filter((_: string, i: number) => i !== index),
      { shouldDirty: true }
    );
  };

  const handleUpdateChapter = async (request: IChapterFormData) => {
    await callChapterApis(async () => {
      const sendData: IUpdateChapterRequest = {
        mangaSlug: slug || "",
        chapterNumber: chapterNumber ? Number(chapterNumber) : 0,
        content: request.images,
      };
      const { data } = await chapterApi.updateChapter(sendData);
      if (data) {
        message.success(data.message, 3);
        toggleChapterChanged();
      }
    });
  };

  const handleDeleteChapter = async () => {
    await callChapterApis(async () => {
      const sendData: IRequestWithChapterNumber = {
        mangaSlug: slug || "",
        chapterNumber: chapterNumber ? Number(chapterNumber) : 0,
      };
      const { data } = await chapterApi.deleteChapter(sendData);
      if (data) {
        message.success(data.message, 3);
        navigate(`/manga/create-manga/${slug}`);
      }
    });
  };

  useEffect(() => {
    const fetchChapter = async () => {
      await callChapterApis(async () => {
        const sendData: IRequestWithChapterNumber = {
          mangaSlug: slug || "",
          chapterNumber: chapterNumber ? Number(chapterNumber) : 0,
        };
        const { data } = await chapterApi.getByChapterNumber(sendData);
        if (data) {
          setChapter(data.data);
          reset({
            chapterNumber: data.data.chapterNumber,
            images: data.data.content,
          });
        }
      });
    };
    fetchChapter();
  }, [isChapterChanged]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md my-14">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          Thông tin Chapter
        </h2>
        <Button
          shape="round"
          icon={icons.delete}
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={() => handleDeleteChapter()}
        >
          Xóa Chapter
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(handleUpdateChapter)}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="block font-medium mb-2">Số thứ tự chapter</label>
          <Controller
            name="chapterNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                className="mt-1"
                disabled={true}
              />
            )}
          />
          <p className="text-red-500">{errors.chapterNumber?.message}</p>
        </div>
        <div>
          <label className="block font-medium mb-2">Danh sách ảnh</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="block w-full border border-gray-300 p-2 rounded-md"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <p className="text-red-500">{errors.images?.message}</p>
        </div>
        <div className="mt-2 space-y-2">
          {chapter &&
            watch("images").map((img: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 border p-2 rounded-md"
              >
                <img
                  src={img}
                  alt={`Chapter Image ${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <Button
                  shape="circle"
                  icon={icons.delete}
                  className="bg-red-500 text-white"
                  onClick={() => removeImage(index)}
                />
              </div>
            ))}
        </div>
        <Button
          htmlType="submit"
          type="primary"
          className="mt-4 w-fit text-base"
          loading={loading}
          disabled={!isDirty}
        >
          Cập nhật Chapter
        </Button>
      </form>
    </div>
  );
};
