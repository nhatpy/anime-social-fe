import { icons } from "../utils/icons"

export const SlotHistory = () => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
        <div className="w-full h-48 items-center justify-center flex p-2 relative border border-black">
        <img src="/assets/images.jpg" alt=""
            className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-fit p-1 bg-opacity-80 from-transparent bg-black text-white flex items-center justify-center">
            <div className="flex flex-row text-xs w-full p-1 opacity-70 gap-1 justify-center items-center">
                <span className="flex flex-row justify-center items-center font-bold gap-1">
                    {icons.delete} Xóa
                </span>
            </div>
        </div>
        </div>
        <div className="flex flex-col gap-2 w-full h-fit p-2">
            <h3 className="text-base text-left w-full">
                Chuyển sinh thành liễu đột biến
            </h3>
            <div className="flex flex-col justify-evenly items-center w-full">
                <div className="flex flex-row justify-between items-center w-full">
                    <span className="text-xs text-gray-800">Đọc tiếp Chapter 30</span>
                </div>
            </div>
        </div>
    </div>    
  )
}
