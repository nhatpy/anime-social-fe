import { Link } from "react-router-dom"
import { CustomBreadcrumb, SlotWithoutX } from "../../components"
import { Pagination, Card, Button } from "antd"
import { icons } from "../../utils/icons"

export const SearchManga = () => {
  const items = [{title: <Link to="/">Trang chủ</Link>}, {title: "Tìm truyện"}]

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5 gap-5">
          <div className="flex flex-col justify-center w-full gap-5">
            <CustomBreadcrumb items={items}/>
          </div>
          <div className="flex flex-row w-full gap-4">
              <div className='flex flex-col gap-2 w-[70%]'>
                <div className="flex justify-center w-full">
                  <h2 className="text-2xl text-center font-base text-blue-600 w-[80%]">
                  Oneshot Manga - Nền tảng đọc truyện tranh đầy đủ và uy tín số 2 Việt Nam
                  </h2>
                </div>
                <div className="flex flex-row items-center justify-center w-full gap-4">
                  <Button className='w-[20%]'>
                    Tất cả
                  </Button>
                  <Button className='w-[20%]'>
                    Hoàn thành
                  </Button>
                  <Button className='w-[20%]'>
                    Đang tiến hành
                  </Button>
                </div>
                <div className='flex flex-row w-full justify-between'>
                  <div className="w-[20%] text-lg">Sắp xếp theo</div>
                  <div className="float w-[80%]">
                    <Button className='w-fit mr-2 mb-1'>
                      Ngày cập nhật
                    </Button>
                    <Button className='w-fit mr-2 mb-1'>
                      Truyện mới
                    </Button>
                    <Button className='w-fit mr-2 mb-1'>
                      {icons.eye} Top tháng
                    </Button>
                    <Button className='w-fit mr-2 mb-1'>
                      {icons.eye} Top tuần
                    </Button>
                    <Button className='w-fit mr-2 mb-1'>
                      {icons.eye} Top ngày
                    </Button>
                    <Button className='w-fit mr-2 mb-1'>
                      {icons.heart} Theo dõi
                    </Button>
                    <Button className='w-fit mr-2 mb-1'>
                      {icons.comment} Bình luận
                    </Button>
                    <Button className='w-fit mr-2 mb-1'>
                      {icons.chapter} Số chapter
                    </Button>                   
                  </div>
                </div>
                <div className='grid grid-cols-4 gap-2 w-full h-full'>
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((_, index) => (
                        <SlotWithoutX key={index} />
                    ))}
                </div>
                <div className='flex justify-center items-center w-full pt-7'>
                  <Pagination align="center" defaultCurrent={1} total={50} />
                </div>
              </div> 
              <div className="w-[30%]">
                <Card 
                  title="Thể loại" 
                  style={{ width: "100%" }} 
                  styles={{body : {padding: "16px"}}}
                >
                  <div className="flex flex-col gap-2 text-base">
                    <div>
                      <p>
                          <Link to="/#">Tất cả</Link>
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p>
                          <Link to="/#">Manhua</Link>
                      </p>
                      <p>
                          <Link to="/#">Manhwa</Link>
                      </p>
                      <p>
                          <Link to="/#">Manga</Link>
                      </p>
                      <p>
                          <Link to="/#">Chuyển sinh</Link>
                      </p>
                      <p>
                          <Link to="/#">Tu tiên</Link>
                      </p>
                      <p>
                          <Link to="/#">Truyện màu</Link>
                      </p>
                      <p>
                          <Link to="/#">Phiêu lưu</Link>
                      </p>
                      <p>
                          <Link to="/#">Romcom</Link>
                      </p>
                      <p>
                          <Link to="/#">Hành động</Link>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>       
          </div>
      </div>
  </div>
  )
}
