import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, message } from "antd";

import { yupResolver } from "@hookform/resolvers/yup";

import { icons } from "../../utils/icons";
import { uploadToCloudinary } from "../../utils/helpers";
import { createChapterSchema } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../hooks";
import { IChapterFormData, ICreateChapterRequest } from "../../interfaces";
import { chapterApi } from "../../apis";

export const CreateChapter = () => {
  const { "manga-slug": slug } = useParams();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createChapterSchema),
    defaultValues: { images: [] },
  });

  const navigate = useNavigate();
  const { loading, errorMessage, callApi: callChapterApis } = useApi<void>();
  const [uploading, setUploading] = useState(false);

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
      setValue("images", [
        ...watch("images"),
        ...uploadedImages.filter((url) => url),
      ]);
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setValue(
      "images",
      watch("images").filter((_: string, i: number) => i !== index)
    );
  };

  const handleCreateChapter = async (request: IChapterFormData) => {
    await callChapterApis(async () => {
      const sendData: ICreateChapterRequest = {
        mangaSlug: slug || "",
        chapterNumber: request.chapterNumber,
        content: request.images,
      };
      const { data } = await chapterApi.createChapter(sendData);
      if (data) {
        message.success(data.message, 3);
        navigate(
          `/manga/create-manga/${slug}/create-chapter/${request.chapterNumber}`
        );
      }
    });
  };

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md my-14">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Thêm Chapter</h2>
      <form
        onSubmit={handleSubmit(handleCreateChapter)}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="block font-medium mb-2">Số thứ tự chapter:</label>
          <Controller
            name="chapterNumber"
            control={control}
            render={({ field }) => (
              <Input {...field} type="number" className="mt-1" />
            )}
          />
          <p className="text-red-500">{errors.chapterNumber?.message}</p>
        </div>
        <div>
          <label className="block font-medium mb-2">Danh sách ảnh:</label>
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
          {watch("images").map((img: string, index: number) => (
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
        >
          Thêm Chapter
        </Button>
      </form>
    </div>
  );
};
