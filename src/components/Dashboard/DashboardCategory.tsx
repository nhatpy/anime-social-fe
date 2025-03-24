import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Modal, Pagination, Popover, Table } from "antd";
import { icons } from "../../utils/icons";

interface CategoryForm {
  name: string;
  description?: string;
}

const dataSource = [
  {
    key: "1",
    name: "Hành động",
    description: "description description 1",
  },
  { key: "2", name: "Manhua", description: "description description 1" },
  { key: "3", name: "Manhwa", description: "description description 1" },
  { key: "4", name: "Manga", description: "description description 1" },
  { key: "5", name: "Chuyển sinh", description: "description description 1" },
  { key: "6", name: "Chuyển sinh", description: "description description 1" },
  { key: "7", name: "Chuyển sinh", description: "description description 1" },
  { key: "8", name: "Chuyển sinh", description: "description description 1" },
];

const content = (
  <div className="flex flex-row gap-2">
    <Button className="text-purple-400 hover:text-purple-600" type="text">
      Sửa {icons.update}
    </Button>
    <Button className="text-red-600 hover:text-red-800" type="text">
      Xóa {icons.delete}
    </Button>
  </div>
);

const columns = [
  {
    title: <span className="font-semibold">Tên thể loại</span>,
    dataIndex: "name",
    key: "name",
    width: "25%",
    render: (name: string) => (
      <p className="truncate font-medium max-w-xs">{name}</p>
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
    render: () => (
      <Popover content={content} trigger="hover" placement="bottom">
        <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
          Hành động
        </Button>
      </Popover>
    ),
  },
];

export const DashboardCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, control, reset } = useForm<CategoryForm>();

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = (data: CategoryForm) => {
    console.log("Dữ liệu danh mục:", data);
    reset();
    setIsModalOpen(false);
  };

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
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
            scroll={{ x: "100%" }}
          />

          <div className="flex justify-center mt-6">
            <Pagination
              defaultCurrent={1}
              total={50}
              showSizeChanger={false}
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
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-6"
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Vui lòng nhập tên danh mục!" }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-gray-700 mb-2">
                  Tên danh mục*
                </label>
                <Input
                  {...field}
                  placeholder="Nhập tên danh mục"
                  className="h-10"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-gray-700 mb-2">Mô tả</label>
                <Input.TextArea
                  {...field}
                  rows={4}
                  placeholder="Nhập mô tả"
                  className="resize-none"
                />
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
            >
              Thêm danh mục
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
