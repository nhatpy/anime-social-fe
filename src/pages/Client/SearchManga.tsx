import { Link, useSearchParams } from "react-router-dom";
import { Pagination, Card, Button, message, Skeleton, Empty } from "antd";

import { CustomBreadcrumb, SlotWithoutX } from "../../components";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks";
import {
  ICategory,
  IGetMangaPaginationRequest,
  IManga,
} from "../../interfaces";
import { categoryApi, mangaApi } from "../../apis";
import {
  mangaSortOptions,
  MangaStatus,
  mangaStatusOptions,
  sortByOptions,
  SortOptions,
  statusOptions,
} from "../../utils/constants";

export const SearchManga = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const items = [
    { title: <Link to="/">Trang chủ</Link> },
    { title: "Tìm truyện" },
  ];

  const { loading: loadingCategory, callApi: callCategoryApis } =
    useApi<void>();
  const {
    loading: loadingManga,
    errorMessage,
    callApi: callMangaApis,
  } = useApi<void>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [mangasAfterSearch, setMangasAfterSearch] = useState<IManga[]>([]);
  const [page, setPage] = useState<number>(1);
  const pageSize = 16;
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [categorySlug, setCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const handleChangeUrl = (params: IGetMangaPaginationRequest) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("page", params.page.toString());
    if (params.searchQuery) newParams.set("searchQuery", params.searchQuery);
    if (params.sortBy) newParams.set("sortBy", params.sortBy);
    if (params.status !== undefined && params.status !== null) {
      newParams.set("status", params.status.toString());
    }
    if (params.categorySlug) newParams.set("categorySlug", params.categorySlug);

    if (params.status === null) {
      newParams.delete("status");
    }
    if (params.categorySlug === null) {
      newParams.delete("categorySlug");
    }

    setSearchParams(newParams, { replace: true });
  };

  const handleDeleteUrl = () => {
    setSearchParams({});
  };

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
    handleChangeUrl({
      page: currentPage,
      size: pageSize,
      type: 1,
      searchQuery: searchQuery,
      sortBy: sortByOptions[sortBy as SortOptions],
      status: statusOptions[status as MangaStatus],
      categorySlug: categorySlug,
    });
  };

  const handleStatusChange = (currentStatus: string) => {
    setStatus(currentStatus);
    setPage(1);
    handleChangeUrl({
      page: 1,
      size: pageSize,
      type: 1,
      searchQuery: searchQuery,
      sortBy: sortByOptions[sortBy as SortOptions],
      status: statusOptions[currentStatus as MangaStatus],
      categorySlug: categorySlug,
    });
  };

  const handleSortByChange = (currentSortBy: string) => {
    setSortBy(currentSortBy);
    setPage(1);
    handleChangeUrl({
      page: 1,
      size: pageSize,
      type: 1,
      searchQuery: searchQuery,
      sortBy: sortByOptions[currentSortBy as SortOptions],
      status: statusOptions[status as MangaStatus],
      categorySlug: categorySlug,
    });
  };

  const handleCategorySlugChange = (currentCategorySlug: string | null) => {
    setCategorySlug(currentCategorySlug);
    setPage(1);
    handleChangeUrl({
      page: 1,
      size: pageSize,
      type: 1,
      searchQuery: searchQuery,
      sortBy: sortByOptions[sortBy as SortOptions],
      status: statusOptions[status as MangaStatus],
      categorySlug: currentCategorySlug,
    });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      await callCategoryApis(async () => {
        const { data } = await categoryApi.getAll();
        if (data) {
          setCategories(data.data);
        }
      });
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchMangaAfterSearch = async () => {
      const currentPage = parseInt(searchParams.get("page") || "1", 10);
      const searchQuery = searchParams.get("searchQuery") || null;
      const sortBy = searchParams.get("sortBy")?.toUpperCase() || "";
      const status = searchParams.get("status")?.toUpperCase() || "";
      const categorySlug = searchParams.get("categorySlug") || null;

      setPage(currentPage);
      setSearchQuery(searchQuery);
      setSortBy(sortBy);
      setStatus(status);
      setCategorySlug(categorySlug);

      await callMangaApis(async () => {
        const sendData: IGetMangaPaginationRequest = {
          page: currentPage,
          size: pageSize,
          type: 1,
          searchQuery: searchQuery,
          sortBy: sortByOptions[sortBy as SortOptions],
          status: statusOptions[status as MangaStatus],
          categorySlug: categorySlug,
        };
        const { data } = await mangaApi.getPagination(sendData);
        if (data) {
          setMangasAfterSearch(data.data);
          setTotal(data.totalItem);
        }
      });
    };
    fetchMangaAfterSearch();
  }, [searchParams]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5 gap-5">
        <div className="flex flex-col justify-center w-full gap-5">
          <CustomBreadcrumb items={items} />
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col gap-2 w-[70%]">
            <div className="flex flex-col items-center justify-center w-full">
              <h2 className="text-2xl text-center font-base text-blue-600 w-[80%]">
                Oneshot Manga - Nền tảng đọc truyện tranh đầy đủ và uy tín số 2
                Việt Nam
              </h2>
              <Button
                type="link"
                onClick={handleDeleteUrl}
                className="text-base text-red-600 font-semibold text-left"
              >
                Xóa bộ lọc
              </Button>
            </div>
            <div className="flex flex-row w-full justify-between">
              <div className="w-[20%] text-lg">Trạng thái</div>
              <div className="flex flex-row items-center justify-center w-full gap-4">
                {mangaStatusOptions.map((item) => (
                  <Button
                    className="w-[20%}"
                    key={item.value}
                    onClick={() => handleStatusChange(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-row w-full justify-between">
              <div className="w-[20%] text-lg">Sắp xếp theo</div>
              <div className="float w-[80%]">
                {mangaSortOptions.map((item) => (
                  <Button
                    className="w-fit mr-2 mb-1"
                    key={item.value}
                    onClick={() => handleSortByChange(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 w-full h-full">
              {loadingManga ? (
                <Skeleton
                  style={{ width: "400%", height: 180 }}
                  paragraph={{ rows: 5 }}
                  active
                />
              ) : mangasAfterSearch.length === 0 ? (
                <div className="flex justify-center items-center w-full h-full col-span-4">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description={
                      <div>
                        <p className="text-lg text-blue-600 font-semibold">
                          Không tìm thấy truyện nào với từ khóa
                        </p>
                      </div>
                    }
                  />
                </div>
              ) : (
                mangasAfterSearch.map((manga) => (
                  <SlotWithoutX key={manga.id} manga={manga} />
                ))
              )}
            </div>
            <div className="flex justify-center items-center w-full pt-7">
              <Pagination
                defaultCurrent={1}
                total={total}
                showSizeChanger={false}
                pageSize={pageSize}
                current={page}
                onChange={(page) => handlePageChange(page)}
                className="ant-pagination-item-active:border-blue-600 ant-pagination-item-active:bg-blue-600"
              />
            </div>
          </div>
          <div className="w-[30%]">
            <Card
              title="Thể loại"
              style={{ width: "100%" }}
              styles={{ body: { padding: "16px" } }}
            >
              <div className="flex flex-col gap-2 text-base">
                <div>
                  <p>
                    <Button
                      type="link"
                      onClick={() => handleCategorySlugChange(null)}
                      className="text-base text-black"
                    >
                      Tất cả
                    </Button>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {loadingCategory ? (
                    <Skeleton active paragraph={{ rows: 2 }} />
                  ) : (
                    categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center gap-2"
                      >
                        <Button
                          type="link"
                          onClick={() =>
                            handleCategorySlugChange(category.slug)
                          }
                          className="text-base text-black"
                        >
                          {category.name.charAt(0).toUpperCase() +
                            category.name.slice(1)}
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
