import { Layout } from "antd"
import { Link } from "react-router-dom";
import { icons } from "../../utils/icons";

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#000',
    width: '100%',
    alignItems: 'center',
  };

const { Footer: AntdFooter } = Layout

export const Footer = () => {
    return (
        <AntdFooter style={footerStyle}>
            <div className="flex justify-between items-center w-[50%] mx-auto">
                <div className="flex flex-col justify-center w-[40%] gap-2 items-center text-left">
                    <img src="/assets/logo.png" alt="logo" className="w-[50%] h-[80px] mx-auto pb-5"/>
                    <div className="divide-x divide-white divide-opacity-50 flex justify-start w-full space-x-2 px-2">
                        <Link to="/about" className="text-white text-sm">Giới thiệu</Link>
                        <Link to="/contact" className="text-white text-sm pl-2">Liên hệ</Link>
                    </div>
                    <div className="divide-x divide-white divide-opacity-50 flex justify-start w-full space-x-2 px-2">
                        <Link to="/policy" className="text-white text-sm">Điều khoản</Link>
                        <Link to="/terms" className="text-white text-sm pl-2">Chính sách bảo mật</Link>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-2 text-xl pt-5">
                        <Link to="http://facebook.com" target="_blank">{icons.facebook}</Link>
                        <Link to="http://twitter.com" target="_blank">{icons.twitter}</Link>
                        <Link to="http://youtube.com" target="_blank">{icons.youtube}</Link>
                        <Link to="http://instagram.com" target="_blank">{icons.instagram}</Link>
                    </div>
                </div>
                <div className="w-[60%] flex flex-col justify-evenly gap-5">
                    <p className="uppercase text-2xl font-bold text-center">miễn trừ trách nhiệm</p>
                    <p className="text-sm text-left">Trang web này cung cấp nội dung truyện tranh chỉ với mục đích giải trí và không chịu trách nhiệm về bất kỳ nội dung quảng cáo, liên kết của bên thứ ba hiển thị trên trang web của chúng tôi.</p>
                    <p className="text-sm text-left">Tất cả thông tin và hình ảnh trên website đều được thu thập từ internet. Chúng tôi không chịu trách nhiệm về bất kỳ nội dung nào. Nếu bạn hoặc tổ chức của bạn có vấn đề gì liên quan đến nội dung hiển thị trên website, vui lòng liên hệ với chúng tôi để được giải quyết.</p>
                </div>
            </div>
            <br />
            <hr />
            <div className='text-center pt-3'>
                <p className='text-gray-400'>
                © Bản quyền thuộc về Oneshot Manga - Website đọc truyện tranh online uy tín
                </p>
            </div>
        </AntdFooter>
    )
}