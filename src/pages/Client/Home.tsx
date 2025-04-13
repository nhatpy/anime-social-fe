import { Button, Carousel, Skeleton, message } from "antd";
import {
  HistoryManga,
  MangaCarousel,
  SlotWithoutX,
  TopManga,
  TopUser,
} from "../../components";
import { useAuthStore } from "../../utils/stores";
import { useApi } from "../../hooks";
import { useEffect, useState } from "react";
import { IGetMangaPaginationRequest, IManga } from "../../interfaces";
import { sortByOptions, SortOptions } from "../../utils/constants";
import { mangaApi } from "../../apis";
import { Link } from "react-router-dom";

export const Home = () => {
  const { isLogin } = useAuthStore();
  const { errorMessage, callApi: callMangaApis } = useApi<void>();
  const [carouselMangas, setCarouselMangas] = useState<IManga[]>([]);
  const [regularMangas, setRegularMangas] = useState<IManga[]>([]);
  const [loadingCarousel, setLoadingCarousel] = useState<boolean>(false);
  const [loadingRegular, setLoadingRegular] = useState<boolean>(false);

  useEffect(() => {
    const fetchCarouselMangas = async () => {
      setLoadingCarousel(true);
      await callMangaApis(async () => {
        const sendData: IGetMangaPaginationRequest = {
          page: 1,
          size: 10,
          type: 1,
        };
        const { data } = await mangaApi.getPagination(sendData);
        if (data) {
          setCarouselMangas(data.data);
        }
      });
      setLoadingCarousel(false);
    };

    const fetchRegularMangas = async () => {
      setLoadingRegular(true);
      await callMangaApis(async () => {
        const sendData: IGetMangaPaginationRequest = {
          page: 1,
          size: 16,
          type: 1,
          sortBy: sortByOptions[SortOptions.CREATE_AT],
        };
        const { data } = await mangaApi.getPagination(sendData);
        if (data) {
          setRegularMangas(data.data);
        }
      });
      setLoadingRegular(false);
    };

    fetchCarouselMangas();
    fetchRegularMangas();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5 gap-5">
        <div className="flex flex-col justify-center w-full gap-5">
          <h3 className="text-xl font-base text-blue-600">Truyện đề cử</h3>
          {loadingCarousel ? (
            <Skeleton style={{ width: "100%", height: 180 }} active />
          ) : (
            <Carousel
              autoplay
              slidesToShow={5}
              slidesToScroll={1}
              infinite
              dots={false}
              arrows={true}
              autoplaySpeed={2000}
            >
              {carouselMangas.map((manga) => (
                <div className="mx-[22px]" key={manga.id}>
                  <MangaCarousel manga={manga} />
                </div>
              ))}
            </Carousel>
          )}
        </div>
        <div className="w-full h-full">
          <h3 className="text-xl font-base text-blue-600 text-left">
            Truyện mới cập nhật
          </h3>
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col gap-2 w-[70%]">
            <div className="grid grid-cols-4 gap-2 w-full h-full">
              {loadingRegular ? (
                <Skeleton
                  style={{ width: "300%", height: 180 }}
                  paragraph={{ rows: 5 }}
                  active
                />
              ) : (
                regularMangas.map((manga) => (
                  <SlotWithoutX key={manga.id} manga={manga} />
                ))
              )}
            </div>
            {!loadingRegular && (
              <Link to="/search" className="w-full">
                <div className="flex justify-center items-center w-full">
                  <Button className="mt-5 w-[20%]">Xem thêm</Button>
                </div>
              </Link>
            )}
          </div>

          <div className="flex flex-col w-[30%] gap-5">
            {isLogin && <HistoryManga />}
            <TopManga />
            <TopUser />
          </div>
        </div>
      </div>
    </div>
  );
};
