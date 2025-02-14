import { Link } from "react-router-dom"

export const DashboardManga = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-3xl font-bold text-blue-800">
        Truyện của bạn
      </h2>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-4 w-full">
          <p className="italic text-sm text-[16px]">Hãy trở thành một phần của cộng đồng <span className="text-amber-500">Oneshot Manga</span>, 
            bằng cách <span className="text-red-600">sáng tác</span> và <span className="text-red-600">đăng tải</span> lên những bộ 
            truyện tranh hấp dẫn tại <Link to="/create-manga" className="text-blue-600">đây</Link>.</p>
          <div className="flex flex-col gap-4 mt-5 text-base text-[18px]">
            <div className="flex flex-row gap-5 items-center w-full">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}