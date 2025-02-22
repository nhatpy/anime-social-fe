import * as yup from "yup";
import { 
  Button, 
  Input, 
  Checkbox, 
  Select, 
  message, 
  Image 
} from "antd";
import { 
  useForm, 
  Controller 
} from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { uploadToCloudinary } from "../../utils/helpers";

const categoryOptions = [
  { label: "Hành động", value: "action" },
  { label: "Phiêu lưu", value: "adventure" },
  { label: "Kinh dị", value: "horror" },
  { label: "Hài hước", value: "comedy" },
];

const schema = yup.object({
  categories: yup.array().min(1, "Vui lòng chọn ít nhất một thể loại").required("Vui lòng chọn ít nhất một thể loại"),
  name: yup.string().required("Vui lòng nhập tên truyện"),
  description: yup.string().required("Vui lòng nhập mô tả"),
  coverImage: yup.string().url("Hình ảnh không hợp lệ").required("Vui lòng chọn ảnh bìa"),
  isCompleted: yup.boolean(),
});

export const CreateManga = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categories: [],
      name: "",
      description: "",
      coverImage: "",
      isCompleted: false,
    },
  });

  interface FormData {
    categories: string[];
    name: string;
    description: string;
    coverImage: string;
    isCompleted?: boolean;
  }

  const onSubmit = (data: FormData) => {
    console.log("Dữ liệu gửi đi:", data);
    message.success("Truyện đã được tạo thành công!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Sáng tác truyện</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="font-semibold">Thể loại</label>
          <Controller
            name="categories"
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
          {errors.categories && (
            <p className="text-red-500 text-sm">{errors.categories.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Tên truyện</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Nhập tên truyện" className="mt-1" />}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="font-semibold">Mô tả</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea {...field} rows={4} placeholder="Nhập mô tả" className="mt-1" />}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <label className="font-semibold mr-4">Ảnh bìa</label>
          <Image
            width={100}
            height={100}
            src={watch("coverImage") || "/assets/avatar.png"}
            className="border border-gray-300 rounded-full"
          />
          <Controller 
            name="coverImage"
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
                <span className="text-red-500">{errors.coverImage?.message}</span>
              </>
            )}
          />
        </div>
        <div>
          <Controller
            name="isCompleted"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                Truyện đã hoàn thành
              </Checkbox>
            )}
          />
        </div>
        <Button type="primary" htmlType="submit">
          Đăng truyện
        </Button>
      </form>
    </div>
  );
};