import { 
    Button, 
    Result 
} from "antd";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Result
            status="404"
            title={<span className="text-5xl font-bold text-red-600">404</span>}
            subTitle={<span className="text-lg text-gray-500">Xin lỗi, trang này không tồn tại!</span>}
            extra={
                <Button type="primary" className="text-base font-semibold py-3" onClick={() => navigate("/")}>
                    Quay lại Trang chủ
                </Button>
            }
        />
    </div>
    );
}