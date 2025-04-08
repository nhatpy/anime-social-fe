import { useEffect, useState } from "react";
import { Button, message } from "antd";

import { icons } from "../../utils/icons";
import { useAuthStore } from "../../utils/stores";
import { useApi } from "../../hooks";
import { IPayment } from "../../interfaces";
import { paymentApi } from "../../apis";

export const DashboardGem = () => {
  const stoneAmounts = [20, 40, 100, 200, 400, 1000];
  //gia tien : [1000, 2000, 5000, 10000, 20000, 50000]

  const { currentUser } = useAuthStore();
  const [selectedGem, setSelectedGem] = useState<number | null>(null);
  const { loading, errorMessage, callApi: sponsorGem } = useApi<void>();

  const handleSponsorGem = async () => {
    await sponsorGem(async () => {
      const sendData: IPayment = {
        userId: currentUser?.id || "",
        amount: selectedGem ? selectedGem * 50 : 0,
      };
      const { data } = await paymentApi.donate(sendData);
      if (data) {
        window.location.href = data.payUrl;
      }
    });
  };

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-3xl font-bold text-blue-800">Linh thạch</h2>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-4 w-full">
          <p className="italic text-sm text-[16px]">
            Linh thạch thể hiện mức độ Tài Phú của bạn tại Oneshot Manga, dùng
            để đua <span className="text-amber-700">Top thành viên</span>, giúp
            bạn trở thành một trong những nhân vật nổi tiếng trên nền tảng này,
            có thể kiểm <span className="text-pink-600">Linh thạch</span> thông
            qua
            <span className="text-red-600"> nạp tiền</span>.
          </p>
          <p className="text-lg font-[500] text-cyan-800 flex gap-2">
            Linh thạch hiện có:{" "}
            <span className="text-pink-600 flex items-center gap-1">
              {(currentUser?.wallet ?? 0) / 50}{" "}
              <span className="text-base">{icons.diamond}</span>
            </span>
          </p>
          <div className="flex flex-col gap-4 mt-5 text-base text-[18px]">
            <div className="flex flex-row gap-5 items-center w-full">
              <p className="text-cyan-800 w-fit">Chọn số lượng linh thạch:</p>
              <div className="flex flex-row gap-5 items-center">
                <Button
                  color="pink"
                  disabled={selectedGem === null}
                  variant="solid"
                  className="text-sm text-[16px] font-medium"
                  loading={loading}
                  onClick={handleSponsorGem}
                >
                  Thu thập linh thạch
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {stoneAmounts.map((amount) => (
                <Button
                  key={amount}
                  color="pink"
                  variant={selectedGem === amount ? "solid" : "outlined"}
                  onClick={() =>
                    setSelectedGem(selectedGem === amount ? null : amount)
                  }
                  className="text-sm text-[16px] font-medium"
                  block
                >
                  {amount.toLocaleString()} {icons.diamond}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
