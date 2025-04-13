import { ApexOptions } from "apexcharts";
import { IStatisticCategory } from "../../interfaces";

export const StatisticCategoryChartOptions = (categoryStatistic: IStatisticCategory | null) => {
    
      const categoryChartOptions: ApexOptions = {
        chart: {
          id: "most-popular-categories",
          toolbar: {
            show: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories:
            categoryStatistic?.name.map((name) => {
              return name.charAt(0).toUpperCase() + name.slice(1);
            }) || [],
        },
        colors: ["#F43F5E"],
        title: {
          text: "Top thể loại có nhiều manga nhất (%)",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#1E3A8A",
          },
        },
      };
    
    
      const categoryChartSeries = [
        {
          name: "Tỷ lệ thể loại",
          data: categoryStatistic?.mangaPercentage || [],
        },
      ];

        return { categoryChartOptions, categoryChartSeries };
    }