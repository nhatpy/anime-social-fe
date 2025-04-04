import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const EmailVerificationReminder = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="w-full pt-10 flex justify-center items-center bg-gray-100">
      <div className="w-[60%] flex flex-col justify-center items-center bg-white p-8 shadow-lg rounded-lg">
        <Result
          status="success"
          title="Bước đầu đăng ký thành công!"
          subTitle="Chúng tôi đã gửi một email xác nhận đến địa chỉ của bạn. Vui lòng kiểm tra hộp thư đến hoặc thư mục spam."
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
