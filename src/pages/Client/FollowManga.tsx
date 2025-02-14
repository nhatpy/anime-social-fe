import { Link } from "react-router-dom"
import { CustomBreadcrumb, HistoryManga, SlotWithX, TopManga, TopUser } from "../../components"
import { Pagination } from "antd"
import { useState } from "react"

export const FollowManga = () => {
  const items = [{title: <Link to="/">Trang chủ</Link>}, {title: "Theo dõi"}]
  const [isLogin] = useState(true);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5 gap-5">
          <div className="flex flex-col justify-center w-full gap-5">
            <CustomBreadcrumb items={items}/>
          </div>
          <div className='w-full h-full'>
              <h3 className="text-xl font-base text-blue-600 text-left">Truyện đang theo dõi</h3>
          </div>
          <div className="flex flex-row w-full gap-4">
              <div className='flex flex-col gap-2 w-[70%]'>
                  <div className='grid grid-cols-4 gap-2 w-full h-full'>
                      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((_, index) => (
                          <SlotWithX key={index} />
                      ))}
                  </div>
                  <div className='flex justify-center items-center w-full pt-7'>
                    <Pagination align="center" defaultCurrent={1} total={50} />
                  </div>
              </div>      
              <div className='flex flex-col w-[30%] gap-5'>  
                  {isLogin && (
                    <>        
                        <HistoryManga />
                    </>
                  )}   
                  <TopManga />
                  <TopUser />
              </div>          
          </div>
      </div>
    </div>
  )
}
