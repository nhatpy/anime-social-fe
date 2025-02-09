import { icons } from "../utils/icons"

export const MangaCarousel = () => {
  return (
    <div className="w-[80%] h-52 flex items-center justify-center relative">
      <img src="/assets/images.jpg" alt=""
          className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[25%] bg-opacity-80 from-transparent bg-black text-white flex items-center justify-center">
        <div className="flex flex-col text-sm w-full p-2">
          <p className="text-center w-full truncate whitespace-nowrap">
            Chuyển sinh thành liễu đột biến
          </p>
          <div className="flex w-full justify-center items-center flex-row">
            <p className="w-[40%]">Chap 1</p>
            <p className="flex flex-row w-[60%] justify-center items-center italic">
              <span className="mr-1">{icons.time}</span>30/12/2024
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
