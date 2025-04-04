import { Button, Carousel } from "antd";

import {
  HistoryManga,
  MangaCarousel,
  SlotWithoutX,
  TopManga,
  TopUser,
} from "../../components";
import { useAuthStore } from "../../utils/stores";

export const Home = () => {
  const { isLogin } = useAuthStore();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5 gap-5">
        <div className="flex flex-col justify-center w-full gap-5">
          <h3 className="text-xl font-base text-blue-600">Truyện đề cử</h3>
          <Carousel
            autoplay
            slidesToShow={5}
            slidesToScroll={1}
            infinite
            dots={false}
            arrows={true}
            autoplaySpeed={2000}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
              <div className="mx-[22px]" key={index}>
                <MangaCarousel />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-full h-full">
          <h3 className="text-xl font-base text-blue-600 text-left">
            Truyện mới cập nhật
          </h3>
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col gap-2 w-[70%]">
            <div className="grid grid-cols-4 gap-2 w-full h-full">
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20,
              ].map((_, index) => (
                <SlotWithoutX key={index} />
              ))}
            </div>
            <div className="flex justify-center items-center w-full">
              <Button className="mt-5 w-[20%]">Xem thêm</Button>
            </div>
          </div>
          <div className="flex flex-col w-[30%] gap-5">
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
  );
};
