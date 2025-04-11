import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Input,
  message,
  Modal,
  Pagination,
  Popover,
  Table,
} from "antd";
import { icons } from "../../utils/icons";
import {
  ICategory,
  ICategoryForm,
  ICreateCategoryRequest,
} from "../../interfaces";
import { createCategorySchema } from "../../utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApi, useBoolean } from "../../hooks";
import { categoryApi } from "../../apis";
import { UpdateCategoryModal } from "..";
import { convertToSlug } from "../../utils/helpers";

export const DashboardCategory = () => {
  const { errorMessage, loading, callApi: callCategoryApis } = useApi<void>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const [total, setTotal] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { value: isCategoryChanged, toggle: categoryChanged } =
    useBoolean(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCategorySchema),
  });

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const handleCancelUpdate = () => {
    setIsUpdateModalOpen(false);
  };

  const handleCreateCategory = async (request: ICategoryForm) => {
    await callCategoryApis(async () => {
      const sendData: ICreateCategoryRequest = {
        slug: convertToSlug(request.name),
        ...request,
      };
      const { data } = await categoryApi.createCategory(sendData);
      if (data) {
        message.success(data.message, 3);
        categoryChanged();
        handleCancel();
      }
    });
  };

  const handleDeleteCategory = async (id: string) => {
    await callCategoryApis(async () => {
      const { data } = await categoryApi.deleteCategory(id);
      if (data) {
        message.success(data.message, 3);
        categoryChanged();
      }
    });
  };

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  useEffect(() => {
    const fetchCategories = async () => {
      await callCategoryApis(async () => {
        const params = {
          page: page,
          size: pageSize,
        };
        const { data } = await categoryApi.getPagination(params);
        if (data) {
          setCategories(data.data);
          setTotal(data.totalItem);
        }
      });
    };
    fetchCategories();
  }, [page, isCategoryChanged]);

  const content = (item: ICategory) => (
    <>
      <div className="flex flex-row gap-2">
        <Button
          className="text-purple-400 hover:text-purple-600"
          type="text"
          onClick={() => setIsUpdateModalOpen(true)}
        >
          Sửa {icons.update}
        </Button>
        <Button
          className="text-red-600 hover:text-red-800"
          type="text"
          onClick={() => handleDeleteCategory(item.id)}
        >
          Xóa {icons.delete}
        </Button>
      </div>
      <UpdateCategoryModal
        isOpen={isUpdateModalOpen}
        handleCancel={handleCancelUpdate}
        toggleChanged={categoryChanged}
        category={item}
      />
    </>
  );

  const columns = [
    {
      title: <span className="font-semibold">Tên thể loại</span>,
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (name: string) => (
        <p className="truncate font-medium max-w-xs">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
      ),
    },
    {
      title: <span className="font-semibold">Miêu tả thể loại</span>,
      dataIndex: "description",
      key: "description",
      width: "60%",
      render: (description: string) => (
        <p className="truncate text-gray-600 max-w-4xl">{description}</p>
      ),
    },
    {
      title: <span className="font-semibold">Hành động</span>,
      key: "action",
      width: "15%",
      align: "center" as const,
      render: (item: ICategory) => (
        <Popover content={content(item)} trigger="click" placement="bottom">
          <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
            Hành động
          </Button>
        </Popover>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6 w-full h-full">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
          Quản lý các thể loại
        </h2>
        <div className="bg-white p-6 pb-3 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-row justify-between items-center mb-6">
            <Button
              type="primary"
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 h-10 flex items-center"
              icon={icons.create}
            >
              Thêm danh mục
            </Button>
          </div>

          <Table
            className="w-full"
            dataSource={categories}
            rowKey={"id"}
            columns={columns}
            pagination={false}
            bordered
            scroll={{ x: "100%" }}
          />

          <div className="flex justify-center mt-6">
            <Pagination
              defaultCurrent={1}
              total={total}
              showSizeChanger={false}
              pageSize={pageSize}
              current={page}
              onChange={(page) => setPage(page)}
              className="ant-pagination-item-active:border-blue-600 ant-pagination-item-active:bg-blue-600"
            />
          </div>
        </div>
      </div>

      <Modal
        title={<span className="text-xl font-semibold">Thêm danh mục</span>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <form
          onSubmit={handleSubmit(handleCreateCategory)}
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
            >
              Thêm danh mục
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
