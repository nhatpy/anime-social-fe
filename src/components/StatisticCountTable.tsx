import React from "react";
import { IStatisticCount, IStatisticRevenueCount } from "../interfaces";

type StatisticTableProps = {
  countData: IStatisticCount | null;
  revenueData: IStatisticRevenueCount | null;
};

const StatisticTable: React.FC<StatisticTableProps> = ({
  countData,
  revenueData,
}) => {
  return (
    <div className="w-full bg-white shadow rounded-lg overflow-hidden border">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 font-semibold text-gray-700">
              Loại thống kê
            </th>
            <th className="text-right p-3 font-semibold text-gray-700">
              Số lượng
            </th>
          </tr>
        </thead>
        <tbody>
          {countData && (
            <>
              <tr className="border-t">
                <td className="p-3">Số lượng Manga</td>
                <td className="p-3 text-right">{countData.numberOfManga}</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Số lượng User</td>
                <td className="p-3 text-right">{countData.numberOfUser}</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Số lượng Thể loại</td>
                <td className="p-3 text-right">{countData.numberOfCategory}</td>
              </tr>
            </>
          )}

          {revenueData && (
            <>
              <tr className="border-t">
                <td className="p-3">Thanh toán ủng hộ thành công</td>
                <td className="p-3 text-right">
                  {revenueData.numberOfSuccess}
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Thanh toán ủng hộ thất bại</td>
                <td className="p-3 text-right">{revenueData.numberOfFailed}</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Đang chờ thanh toán ủng hộ</td>
                <td className="p-3 text-right">
                  {revenueData.numberOfPending}
                </td>
              </tr>
              <tr className="border-t text-base">
                <td className="p-3 font-semibold">Tổng doanh thu</td>
                <td className="p-3 text-right font-semibold text-green-600">
                  {revenueData.totalRevenue.toLocaleString()}đ
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticTable;
