import { Button, message, Result } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApi } from "../../hooks";
import { useEffect } from "react";
import { paymentApi } from "../../apis";

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { errorMessage, callApi: paymentCallback } = useApi<void>();
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleCallback = async () => {
      await paymentCallback(async () => {
        const callbackParams = new Map<string, string>();
        for (const [key, value] of searchParams.entries()) {
          callbackParams.set(key, value);
        }
        await paymentApi.callback(callbackParams);
        message.success("Nạp tiền thành công!", 3);
      });
    };
    handleCallback();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);
  return (
    <div className="w-full pt-10 flex justify-center items-center bg-gray-100">
      <div className="w-[60%] flex flex-col justify-center items-center bg-white p-8 shadow-lg rounded-lg">
        <Result
          status="success"
          title="Cảm ơn bạn đã ủng hộ chúng tôi!"
          extra={
            <Button type="primary" size="large" onClick={handleBackToHome}>
              Quay lại trang chủ
            </Button>
          }
        />
      </div>
    </div>
  );
};
