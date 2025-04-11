import { Key, useEffect, useState } from "react";
import { Button, message, Pagination, Table } from "antd";
import { icons } from "../../utils/icons";
import { IBulkActiveRequest, IManga, ISimpleChapter } from "../../interfaces";
import { useApi, useBoolean } from "../../hooks";
import { mangaApi } from "../../apis";

export const DashboardManageManga = () => {
  const [mangas, setMangas] = useState<IManga[]>([]);
  const { loading, errorMessage, callApi: callMangaApis } = useApi<void>();
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [total, setTotal] = useState(0);

  const { value: isMangasChanged, toggle: mangasChanged } = useBoolean(false);
  const [selectedManga, setSelectedManga] = useState<string[]>([]);

  const rowSelection = {
    selectedRowKeys: selectedManga,
    onChange: (selectedRowKeys: Key[]) => {
      setSelectedManga(selectedRowKeys as string[]);
    },
    getCheckboxProps: (record: { isActive: boolean }) => ({
      disabled: record.isActive,
    }),
  };

  const handleConfirm = async () => {
    await callMangaApis(async () => {
      const sendData: IBulkActiveRequest = {
        mangaIds: selectedManga,
      };
      const { data } = await mangaApi.bulkActive(sendData);
      if (data) {
        message.success(data.message, 3);
        mangasChanged();
        setSelectedManga([]);
      }
    });
  };

  const handleDeleteManga = async (slug: string) => {
    await callMangaApis(async () => {
      const { data } = await mangaApi.deleteManga(slug);
      if (data) {
        message.success(data.message, 3);
        mangasChanged();
      }
    });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      await callMangaApis(async () => {
        const params = {
          type: 0,
          page: page,
          size: pageSize,
        };
        const { data } = await mangaApi.getPagination(params);
        if (data) {
          setMangas(data.data);
          setTotal(data.totalItem);
        }
      });
    };
    fetchUsers();
  }, [isMangasChanged, page]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  const columns = [
    {
      title: <span className="font-semibold">Hình nền</span>,
      dataIndex: "coverImage",
      key: "coverImage",
      width: "12%",
      align: "center" as const,
      render: (coverImage: string) => (
        <div className="flex justify-center items-center">
          <img
            src={coverImage}
            alt="Cover"
            className="w-16 h-20 object-cover rounded-lg border border-gray-200"
          />
        </div>
      ),
    },
    {
      title: <span className="font-semibold">Tên truyện</span>,
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (name: string) => (
        <p className="truncate font-medium text-gray-800 hover:text-blue-600 cursor-pointer max-w-[320px]">
          {name}
        </p>
      ),
    },
    {
      title: <span className="font-semibold">Lượt theo dõi</span>,
      dataIndex: "view",
      key: "view",
      width: "15%",
      align: "center" as const,
      render: (view: string) => (
        <p className="font-medium text-gray-700">{view}</p>
      ),
    },
    {
      title: <span className="font-semibold">Số chapter</span>,
      dataIndex: "chapters",
      key: "chapters",
      width: "15%",
      align: "center" as const,
      render: (chapters: ISimpleChapter[]) => (
        <p className="font-medium text-gray-700">{chapters.length}</p>
      ),
    },
    {
      title: <span className="font-semibold">Trạng thái</span>,
      dataIndex: "isActive",
      key: "isActive",
      width: "15%",
      align: "center" as const,
      render: (isActive: boolean) => (
        <span
          className={`font-medium ${
            isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isActive ? "Đã xác nhận" : "Chưa xác nhận"}
        </span>
      ),
    },
    {
      title: <span className="font-semibold">Hành động</span>,
      key: "action",
      width: "13%",
      align: "center" as const,
      render: (item: IManga) => (
        <Button
          className="text-red-600 hover:text-red-700 font-medium"
          type="text"
          icon={icons.delete}
          loading={loading}
          onClick={() => handleDeleteManga(item.slug)}
        >
          Xóa
        </Button>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-6 w-full h-full p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
        Quản lý truyện
      </h2>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
        <span className="text-gray-700 text-lg font-medium">
          Đã chọn: <span className="text-blue-600">{selectedManga.length}</span>{" "}
          truyện
        </span>
        <Button
          type="primary"
          className="bg-blue-600 hover:bg-blue-700 h-10 px-6 font-medium"
          disabled={selectedManga.length === 0}
          onClick={handleConfirm}
        >
          Xác nhận truyện
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <Table
          dataSource={mangas}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
          bordered
          scroll={{ x: "100%" }}
          className="w-full"
          rowKey={"id"}
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
  );
};
