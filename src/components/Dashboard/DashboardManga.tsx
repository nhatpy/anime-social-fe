import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, message, Pagination, Popover, Table } from "antd";

import { icons } from "../../utils/icons";
import { useEffect, useState } from "react";
import {
  IGetMangaByAuthorIdRequest,
  IManga,
  ISimpleChapter,
} from "../../interfaces";
import { useApi, useBoolean } from "../../hooks";
import { mangaApi } from "../../apis";
import { useAuthStore } from "../../utils/stores";

export const DashboardManga = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mangas, setMangas] = useState<IManga[]>([]);
  const { loading, errorMessage, callApi: callMangaApis } = useApi<void>();
  const { value: isMangaChanged, toggle: toggleMangaChanged } =
    useBoolean(false);
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [total, setTotal] = useState(0);

  const handleChangePage = (page: number) => {
    setPage(page);
    setSearchParams({ page: page.toString() });
  };

  const handleUpdateManga = (slug: string) => {
    navigate(`/manga/create-manga/${slug}`);
  };

  const handleDeleteManga = async (slug: string) => {
    await callMangaApis(async () => {
      const { data } = await mangaApi.deleteManga(slug);
      if (data) {
        message.success(data.message, 3);
        toggleMangaChanged();
      }
    });
  };

  const content = (item: IManga) => (
    <div className="flex flex-row gap-2">
      <Button
        className="text-blue-600"
        type="text"
        onClick={() => handleUpdateManga(item.slug)}
      >
        Sửa{icons.create}
      </Button>
      <Button
        className="text-red-600"
        type="text"
        loading={loading}
        onClick={() => handleDeleteManga(item.slug)}
      >
        Xóa{icons.delete}
      </Button>
    </div>
  );

  useEffect(() => {
    const fetchMangas = async () => {
      const currentPage = parseInt(searchParams.get("page") || "1", 10);
      setPage(currentPage);
      await callMangaApis(async () => {
        const pagingRequest: IGetMangaByAuthorIdRequest = {
          authorId: currentUser?.id || "",
          page: currentPage,
          size: pageSize,
        };
        const { data } = await mangaApi.getMangaByAuthorId(pagingRequest);
        if (data) {
          setMangas(data.data);
          setTotal(data.totalItem);
        }
      });
    };
    fetchMangas();
  }, [searchParams, isMangaChanged]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  const columns = [
    {
      title: "Hình nền",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (coverImage: string) => (
        <img
          src={coverImage}
          alt=""
          className="w-[70px] h-[70px] object-cover rounded-lg"
        />
      ),
    },
    {
      title: "Tên truyện",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <p className="w-[200px] truncate font-semibold">{name}</p>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "view",
      key: "view",
      render: (view: string) => (
        <p className="font-semibold flex justify-center items-center">{view}</p>
      ),
    },
    {
      title: "Số chapter",
      dataIndex: "chapters",
      key: "chapters",
      render: (chapters: ISimpleChapter[]) => (
        <p className="font-semibold flex justify-center items-center">
          {chapters.length}
        </p>
      ),
    },
    {
      title: "Xác nhận",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) =>
        isActive ? (
          <p className="text-green-600 font-semibold">Đã xác nhận</p>
        ) : (
          <p className="text-red-600 font-semibold">Chưa xác nhận</p>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (item: IManga) => (
        <Popover content={content(item)} trigger="click">
          <Button type="primary">Hành động</Button>
        </Popover>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-3xl font-bold text-blue-800">Truyện của bạn</h2>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-4 w-full">
          <p className="italic text-sm text-[16px]">
            Hãy trở thành một phần của cộng đồng{" "}
            <span className="text-amber-500">Oneshot Manga</span>, bằng cách{" "}
            <span className="text-red-600">sáng tác</span> và{" "}
            <span className="text-red-600">đăng tải</span> lên những bộ truyện
            tranh hấp dẫn tại{" "}
            <Link to="/manga/create-manga" className="text-blue-600">
              đây
            </Link>
            .
          </p>
          <div className="flex flex-col gap-4 mt-5 text-base text-[18px]">
            <div className="flex flex-row gap-5 items-center justify-center w-full">
              <Table
                dataSource={mangas}
                columns={columns}
                pagination={false}
                className="w-full"
                rowClassName="hover:bg-gray-100 cursor-pointer"
                rowKey={"id"}
                loading={loading}
              />
            </div>
            <div className="flex justify-center items-center w-full">
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
      </div>
    </div>
  );
};
