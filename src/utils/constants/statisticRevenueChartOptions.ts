import { ApexOptions } from "apexcharts";
import { IStatisticRevenue } from "../../interfaces";

export const StatisticRevenueChartOptions = (statisticRevenue: IStatisticRevenue | null) => {
    const revenueChartOptions: ApexOptions = {
        chart: {
          id: "revenue-chart",
          toolbar: {
            show: true,
          },
        },
        xaxis: {
          categories:
            statisticRevenue?.date?.map((item) => {
              const date = new Date(item);
              const month = date.getMonth() + 1;
              return "Tháng " + month;
            }) || [],
        },
        colors: ["#3B82F6"],
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "Doanh thu theo tháng (VNĐ)",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#1E3A8A",
          },
        },
      };
       const revenueChartSeries = [
    {
      name: "Doanh thu",
      data: statisticRevenue?.revenue || [],
    },
  ];

return { revenueChartOptions, revenueChartSeries };
}