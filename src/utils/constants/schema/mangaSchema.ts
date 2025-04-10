import * as yup from "yup";

export const createMangaSchema = yup.object().shape({
  categoryIds: yup
      .array()
      .min(1, "Vui lòng chọn ít nhất một thể loại")
      .required("Vui lòng chọn ít nhất một thể loại"),
    name: yup.string().required("Vui lòng nhập tên truyện"),
    description: yup.string().required("Vui lòng nhập mô tả"),
    coverImg: yup
      .string()
      .url("Hình ảnh không hợp lệ")
      .required("Vui lòng chọn ảnh bìa"),
    isDone: yup.boolean(),
});
