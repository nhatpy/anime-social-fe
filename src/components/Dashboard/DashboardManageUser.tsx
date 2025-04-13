import { Button, message, Pagination, Popover, Table } from "antd";
import { icons } from "../../utils/icons";
import { IUser } from "../../interfaces";
import { useEffect, useState } from "react";
import { useApi, useBoolean } from "../../hooks";
import { userApi } from "../../apis";
import { useSearchParams } from "react-router-dom";

export const DashboardManageUser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<IUser[]>([]);
  const { loading, errorMessage, callApi: callUserApis } = useApi<void>();
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [total, setTotal] = useState(0);

  const { value: isUserChanged, toggle: userChanged } = useBoolean(false);

  const handleWarningUser = async (userId: string) => {
    await callUserApis(async () => {
      const { data } = await userApi.warningUser(userId);
      if (data) {
        message.success(data.message, 3);
        userChanged();
      }
    });
  };

  const handleChangePage = (page: number) => {
    setPage(page);
    setSearchParams({ page: page.toString() });
  };

  const handleDeleteUser = async (userId: string) => {
    await callUserApis(async () => {
      const { data } = await userApi.deleteUser(userId);
      if (data) {
        message.success(data.message, 3);
        userChanged();
      }
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const currentPage = parseInt(searchParams.get("page") || "1", 10);
      setPage(currentPage);
      await callUserApis(async () => {
        const params = {
          page: currentPage,
          size: pageSize,
        };
        const { data } = await userApi.getPagination(params);
        if (data) {
          setUsers(data.data);
          setTotal(data.totalItem);
        }
      });
    };
    fetchUsers();
  }, [searchParams, isUserChanged]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  const content = (item: IUser) => (
    <div className="flex flex-row gap-2">
      <Button
        className="text-amber-500 hover:text-amber-600"
        type="text"
        onClick={() => handleWarningUser(item.id)}
        loading={loading}
        disabled={item.isBanned}
      >
        Cảnh cáo {icons.iconwithI}
      </Button>
      <Button
        className="text-red-600 hover:text-red-700"
        type="text"
        onClick={() => handleDeleteUser(item.id)}
        loading={loading}
      >
        Xóa {icons.delete}
      </Button>
    </div>
  );

  const columns = [
    {
      title: <span className="font-semibold">Ảnh đại diện</span>,
      dataIndex: "avatar",
      key: "avatar",
      width: "15%",
      align: "center" as const,
      render: (avatar: string) => (
        <div className="flex items-center justify-center">
          <img
            src={avatar}
            alt="Avatar"
            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
          />
        </div>
      ),
    },
    {
      title: <span className="font-semibold">Tên người dùng</span>,
      dataIndex: "fullName",
      key: "fullName",
      width: "25%",
      align: "center" as const,
      render: (fullName: string) => (
        <p className="truncate font-medium text-gray-800">{fullName}</p>
      ),
    },
    {
      title: <span className="font-semibold">Linh thạch</span>,
      dataIndex: "wallet",
      key: "wallet",
      width: "20%",
      align: "center" as const,
      render: (wallet: string) => (
        <p className="text-pink-600 font-medium flex items-center justify-center gap-1">
          {Number(wallet) / 50}
          {icons.diamond}
        </p>
      ),
    },
    {
      title: <span className="font-semibold">Trạng thái</span>,
      key: "status",
      width: "20%",
      align: "center" as const,
      render: (item: IUser) => (
        <span
          className={`font-medium ${
            item.isBanned
              ? "text-red-600"
              : item.isWarning
              ? "text-amber-500"
              : "text-green-600"
          }`}
        >
          {item.isBanned
            ? "Đã khóa"
            : item.isWarning
            ? "Đã cảnh cáo"
            : "Đang hoạt động"}
        </span>
      ),
    },
    {
      title: <span className="font-semibold">Hành động</span>,
      key: "action",
      width: "20%",
      align: "center" as const,
      render: (item: IUser) => (
        <Popover
          content={content(item)}
          trigger="click"
          placement="bottom"
          overlayClassName="popover-no-padding"
        >
          <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
            Hành động
          </Button>
        </Popover>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
        Quản lý người dùng
      </h2>
      <div className="bg-white p-6 pb-3 rounded-lg shadow-sm border border-gray-100">
        <Table
          className="w-full"
          dataSource={users}
          columns={columns}
          pagination={false}
          bordered
          scroll={{ x: "100%" }}
          rowKey={"id"}
          loading={loading}
        />

        <div className="flex justify-center mt-6">
          <Pagination
            defaultCurrent={1}
            total={total}
            showSizeChanger={false}
            pageSize={pageSize}
            current={page}
            onChange={handleChangePage}
            className="ant-pagination-item-active:border-blue-600 ant-pagination-item-active:bg-blue-600"
          />
        </div>
      </div>
    </div>
  );
};
