import { Link } from "react-router-dom"
import { CustomBreadcrumb, HistoryManga, TopManga } from "../../components"

export const Policy = () => {
    const items = [{title: <Link to="/">Trang chủ</Link>}, {title: "Điều khoản"}]

  return (
    <div className="w-full h-full flex justify-center items-center">
        <div className="w-[60%] h-full flex flex-row bg-white p-5">
            <div className="flex flex-col w-full h-full pr-5">
                <div className="flex items-start justify-start w-full">
                    <CustomBreadcrumb items={items}/>
                </div>
                <div className="flex flex-col justify-center w-full gap-2 h-full">
                    <h1 className="text-4xl font-bold text-blue-800">
                    Điều khoản
                    </h1>
                    <p className="text-left">
                    Mọi thông tin và hình ảnh trên website đều được sưu tầm trên Internet. Chúng tôi không sở hữu hay chịu trách nhiệm bất kỳ thông tin nào trên web này. Nếu làm ảnh hưởng đến cá nhân hay tổ chức nào, khi được yêu cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức.              </p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-[40%] gap-2 text-right">
                <HistoryManga />
                <TopManga />
            </div>
        </div>
    </div>
  )
}
