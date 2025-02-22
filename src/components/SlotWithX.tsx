import { Popover } from "antd"

import { icons } from "../utils/icons"

export const SlotWithX = () => {
    
    const title = (
        <div className="w-[300px] text-lg font-medium">
            Chuyển sinh thành liễu đột biến
        </div>
        )
        const content = (
        <div className="w-[300px] flex flex-col gap-2">
            <div className="flex flex-row gap-1 w-full">
            <img src="/assets/images.jpg" alt="" className="w-[40%] h-[180px] rounded"/>
            <div className="flex flex-col gap-1 w-[60%]">
                <p><span className="font-semibold text-blue-800">Thể loại: </span>Chuyển sinh, Manhua, Truyện màu, Tu tiên</p>
                <p><span className="font-semibold text-blue-800">Tình trạng: </span>Chưa hoàn thành</p>
                <p><span className="font-semibold text-blue-800">Lượt xem: </span>100K</p>
                <p><span className="font-semibold text-blue-800">Bình luận: </span>200</p>
                <p><span className="font-semibold text-blue-800">Theo dõi: </span>76K</p>
                <p><span className="font-semibold text-blue-800">Ngày cập nhật: </span>30/12/2024</p>
            </div>
            </div>
            <div>
            Ngu Tử Du bị chết sặc rồi chuyển sinh thành một cây liễu đột biến và bắt đầu cuộc phiêu lưu của mình.
            </div>
        </div>
    );

  return (
    <div className="flex flex-col w-full h-full gap-2">
        <div className="w-full h-48 items-center justify-center flex p-2 relative border border-black">
            <button className="absolute top-2 right-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 z-10">
                {icons.close}
            </button>
            <img src="/assets/images.jpg" alt=""
                className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-fit p-1 bg-opacity-80 from-transparent bg-black text-white flex items-center justify-center">
                <div className="flex flex-row text-xs w-full p-1 opacity-70 gap-1">
                    <span className="flex flex-row justify-center items-center">{icons.eye}0</span>
                    <span className="flex flex-row justify-center items-center">{icons.comment}0</span>
                    <span className="flex flex-row justify-center items-center">{icons.heart}0</span>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-2 w-full h-fit p-2">
            <Popover 
                content={content} 
                title={title}
                trigger="hover"
            >
                <h3 className="text-base text-left w-full font-medium">
                    Chuyển sinh thành liễu đột biến
                </h3>
            </Popover>
            <div className="flex flex-col justify-evenly items-center w-full">
                <div className="flex flex-row justify-between items-center w-full">
                    <span>Chap 1</span> <span className="text-xs text-gray-400 italic">30/12/2024</span>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                    <span>Chap 2</span> <span className="text-xs text-gray-400 italic">30/12/2024</span>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                    <span>Chap 3</span> <span className="text-xs text-gray-400 italic">30/12/2024</span>
                </div>
            </div>
        </div>
    </div>    
  )
}
