import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Modal, Pagination, Popover, Table } from "antd";

import { icons } from "../../utils/icons";

interface CategoryForm {
  name: string;
  description?: string;
}

const dataSource = [
  { key: "1", name: "Hành động", description: "description description 1" },
  { key: "2", name: "Manhua", description: "description description 1" },
  { key: "3", name: "Manhwa", description: "description description 1" },
  { key: "4", name: "Manga", description: "description description 1" },
  { key: "5", name: "Chuyển sinh", description: "description description 1" },
];
const content = (
  <div className="flex flex-row gap-2">
    <Button className="text-purple-400" type="text">
      Sửa{icons.update}
    </Button>
    <Button className="text-red-600" type="text">
      Xóa{icons.delete}
    </Button>
  </div>
);
const columns = [
  {
    title: "Tên thể loại",
    dataIndex: "name",
    key: "name",
    render: (name: string) => <p className="w-[80px] truncate">{name}</p>,
  },
  {
    title: "Miêu tả thể loại",
    dataIndex: "description",
    key: "description",
    render: (description: string) => (
      <p className="w-[300px] truncate">{description}</p>
    ),
  },
  {
    title: "Hành động",
    key: "action",
    render: () => (
      <Popover content={content} trigger="hover">
        <Button type="primary">Hành động</Button>
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
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className="text-3xl font-bold text-blue-800">Quản lý danh mục</h2>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          {icons.create}
        </Button>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4 mt-5 text-base text-[18px]">
            <div className="flex flex-row gap-5 items-center justify-center w-full">
              <Table
                className="w-full"
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
            <div className="flex justify-center items-center w-full">
              <Pagination align="center" defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Thêm danh mục"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Vui lòng nhập tên danh mục!" }}
            render={({ field, fieldState }) => (
              <div>
                <Input {...field} placeholder="Nhập tên danh mục" />
                {fieldState.error && (
                  <p className="text-red-500 text-sm">
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
              <Input.TextArea {...field} rows={3} placeholder="Nhập mô tả" />
            )}
          />

          <div className="flex gap-2">
            <Button type="primary" htmlType="submit">
              Thêm danh mục
            </Button>
            <Button onClick={handleCancel}>Hủy</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
