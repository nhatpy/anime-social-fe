import * as yup from "yup";

export const createChapterSchema = yup.object().shape({
  chapterNumber: yup.number().positive("Số thứ tự phải lớn hơn 0").required("Vui lòng nhập số thứ tự"),
  images: yup.array().min(1, "Cần ít nhất một ảnh").required(),
});
