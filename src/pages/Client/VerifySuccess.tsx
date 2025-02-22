import { 
  Button, 
  Result 
} from "antd";

export const VerifySuccess = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[60%] flex flex-col justify-center items-center bg-white p-8 shadow-lg rounded-lg">
        <Result
          status="success"
          title="Xác minh thành công!"
          subTitle="Tài khoản của bạn đã được xác minh. Bạn có thể đăng nhập để sử dụng các dịch vụ của chúng tôi."
          extra={
            <Button type="primary" size="large" href="/login">
              Đăng nhập
            </Button>
          }
        />
      </div>
    </div>
  );
};
