import ReactApexChart from "react-apexcharts";
import { useApi } from "../../hooks";
import { useEffect, useState } from "react";
import { statisticApi } from "../../apis";
import {
  IManga,
  IPaginationRequest,
  ISimpleChapter,
  IUser,
  IStatisticRevenue,
  IStatisticCategory,
  IStatisticCount,
  IStatisticRevenueCount,
} from "../../interfaces";
import { message, Pagination, Table } from "antd";
import { icons } from "../../utils/icons";
import StatisticTable from "../StatisticCountTable";
import {
  StatisticCategoryChartOptions,
  StatisticRevenueChartOptions,
} from "../../utils/constants";

export const DashboardChart = () => {
  const { loading, errorMessage, callApi: callStatisticApis } = useApi<void>();

  const [statisticRevenue, setStatisticRevenue] =
    useState<IStatisticRevenue | null>(null);
  const [finalCount, setFinalCount] = useState<IStatisticCount | null>(null);
  const [revenueCount, setRevenueCount] =
    useState<IStatisticRevenueCount | null>(null);
  const [categoryStatistic, setCategoryStatistic] =
    useState<IStatisticCategory | null>(null);

  const { categoryChartOptions, categoryChartSeries } =
    StatisticCategoryChartOptions(categoryStatistic);

  const { revenueChartOptions, revenueChartSeries } =
    StatisticRevenueChartOptions(statisticRevenue);

  const pageSize = 8;

  const [users, setUsers] = useState<IUser[]>([]);
  const [pageUser, setPageUser] = useState(1);
  const [totalUser, setTotalUser] = useState(0);

  const [mangas, setMangas] = useState<IManga[]>([]);
  const [pageManga, setPageManga] = useState(1);
  const [totalManga, setTotalManga] = useState(0);

  useEffect(() => {
    const fetchRevenue = async () => {
      await callStatisticApis(async () => {
        const { data } = await statisticApi.getRevenues();
        if (data) {
          setStatisticRevenue(data.data);
          setRevenueCount(data.data.status);
        }
      });
    };
    const fetchCategories = async () => {
      await callStatisticApis(async () => {
        const { data } = await statisticApi.getMostPopularCategory();
        if (data) {
          setCategoryStatistic(data.data);
        }
      });
    };
    const fetchFinalCount = async () => {
      await callStatisticApis(async () => {
        const { data } = await statisticApi.getCount();
        if (data) {
          setFinalCount(data.data);
        }
      });
    };
    fetchRevenue();
    fetchCategories();
    fetchFinalCount();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      await callStatisticApis(async () => {
        const sendData: IPaginationRequest = {
          page: pageUser,
          size: pageSize,
        };
        const { data } = await statisticApi.getUsers(sendData);
        if (data) {
          setTotalUser(data.totalItem);
          setUsers(data.data);
        }
      });
    };
    fetchUsers();
  }, [pageUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      await callStatisticApis(async () => {
        const sendData: IPaginationRequest = {
          page: pageManga,
          size: pageSize,
        };
        const { data } = await statisticApi.getMangas(sendData);
        if (data) {
          setTotalManga(data.totalItem);
          setMangas(data.data);
        }
      });
    };
    fetchUsers();
  }, [pageManga]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  const mangaColumns = [
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
  ];
  const userColumns = [
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
  ];

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
        Thống kê trang web
      </h2>
      <div className="bg-white p-6 pb-3 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-6">
        <div className="w-full">
          <ReactApexChart
            options={categoryChartOptions}
            series={categoryChartSeries}
            type="bar"
            height={400}
          />
        </div>

        <div className="w-full flex flex-row gap-6 items-stretch">
          <div className="w-[70%] h-full">
            <div className="h-full">
              <ReactApexChart
                options={revenueChartOptions}
                series={revenueChartSeries}
                type="bar"
                height="100%"
              />
            </div>
          </div>
          <div className="w-[30%]">
            <StatisticTable revenueData={revenueCount} countData={finalCount} />
          </div>
        </div>

        <div className="w-full p-6 pb-3 flex flex-col gap-6">
          <p className="font-bold text-[#1E3A8A] text-base">
            Danh sách các người dùng đã ủng hộ
          </p>
          <div className="w-full flex flex-row gap-6">
            <Table
              className="w-full"
              dataSource={users}
              columns={userColumns}
              pagination={false}
              bordered
              scroll={{ x: "100%" }}
              rowKey={"id"}
              loading={loading}
            />

            <div className="flex justify-center mt-6">
              <Pagination
                defaultCurrent={1}
                total={totalUser}
                showSizeChanger={false}
                pageSize={pageSize}
                current={pageUser}
                onChange={setPageUser}
                className="flex flex-col items-center justify-center gap-2 ant-pagination-item-active:border-blue-600 ant-pagination-item-active:bg-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="w-full p-6 pb-3 flex flex-col gap-6">
          <p className="font-bold text-[#1E3A8A] text-base">
            Danh sách các truyện phổ biến
          </p>

          <div className="w-full flex flex-row gap-6">
            <Table
              className="w-full"
              dataSource={mangas}
              columns={mangaColumns}
              pagination={false}
              bordered
              scroll={{ x: "100%" }}
              rowKey={"id"}
              loading={loading}
            />

            <div className="flex justify-center mt-6">
              <Pagination
                defaultCurrent={1}
                total={totalManga}
                showSizeChanger={false}
                pageSize={pageSize}
                current={pageManga}
                onChange={setPageManga}
                className="flex flex-col items-center justify-center gap-2 ant-pagination-item-active:border-blue-600 ant-pagination-item-active:bg-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
