import * as yup from "yup";

export const createCategorySchema = yup.object().shape({
  name: yup.string().required("Tên thể loại không được để trống"),
  description: yup.string().required("Miêu tả thể loại không được để trống"),
});
