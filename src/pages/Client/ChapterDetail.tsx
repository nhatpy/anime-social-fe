import { Button, Form, Input, message, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ChapterNavigation,
  Comments,
  CustomBreadcrumb,
} from "../../components";
import {
  IChapter,
  ICommentFormData,
  IPostCommentRequest,
  IRequestWithChapterNumber,
} from "../../interfaces";
import { useApi, useBoolean } from "../../hooks";
import { chapterApi, commentApi } from "../../apis";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../utils/stores";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "../../utils/constants";

const { TextArea } = Input;

export const ChapterDetail = () => {
  const { "manga-slug": slug, "chapter-number": chapterNumber } = useParams();
  const { loading, errorMessage, callApi: callMangaApis } = useApi<void>();
  const [chapter, setChapter] = useState<IChapter | null>(null);

  const { currentUser } = useAuthStore();
  const { value: commentsChanged, toggle: toggleCommentsChanged } =
    useBoolean(false);
  const maxLength = 300;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
  });

  const handleUploadComment = async (request: ICommentFormData) => {
    await callMangaApis(async () => {
      const sendData: IPostCommentRequest = {
        userId: currentUser?.id || "",
        chapterId: chapter?.id || "",
        content: request.comment,
      };
      const { data } = await commentApi.createComment(sendData);
      if (data) {
        message.success(data.message, 3);
        reset();
        toggleCommentsChanged();
      }
    });
  };

  useEffect(() => {
    const fetchMangaDetail = async () => {
      await callMangaApis(async () => {
        const sendData: IRequestWithChapterNumber = {
          mangaSlug: slug as string,
          chapterNumber: Number(chapterNumber),
        };
        const { data } = await chapterApi.getByChapterNumber(sendData);
        if (data) {
          setChapter(data.data);
        }
      });
    };
    fetchMangaDetail();
  }, [chapterNumber, slug]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  const items = [
    { title: <Link to="/">Trang chủ</Link> },
    { title: <Link to="/search">Thể loại</Link> },
    {
      title: (
        <Link to={`/manga/${slug}`}>{chapter?.mangaName || "Tên truyện"}</Link>
      ),
    },
    { title: <p>Chapter {chapterNumber}</p> },
  ];

  const renderSkeleton = () => (
    <>
      <Skeleton active title={{ width: "60%" }} paragraph={{ rows: 0 }} />
      <Skeleton active paragraph={{ rows: 1 }} />
      {[1, 2, 3].map((_, idx) => (
        <Skeleton.Image
          key={idx}
          style={{ width: "100%", height: 300, marginBottom: 10 }}
        />
      ))}
    </>
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5">
        <div className="flex flex-col justify-center w-full">
          <CustomBreadcrumb items={items} />
        </div>

        <div className="flex flex-col w-full h-fit-content gap-5">
          {chapter ? (
            <>
              <h3 className="text-2xl text-[22px]">
                {chapter?.mangaName} - Chapter {chapterNumber}{" "}
                <span className="text-sm italic text-gray-500">
                  [Cập nhật lúc:{" "}
                  {chapter?.updateAt
                    ? new Date(chapter.updateAt).toLocaleString("vi-VN")
                    : "N/A"}
                  ]
                </span>
              </h3>
              <ChapterNavigation
                currentChapter={Number(chapterNumber)}
                numberOfChapter={chapter.numberOfChapter}
                mangaSlug={slug as string}
              />
              <div className="w-full flex flex-col gap-1">
                {chapter?.content.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`Chapter ${chapterNumber} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ))}
              </div>
              <div className="flex flex-col justify-center w-full">
                <CustomBreadcrumb items={items} />
              </div>
            </>
          ) : (
            renderSkeleton()
          )}
        </div>

        <div className="flex flex-col w-full h-fit-content gap-5">
          <h3 className="text-2xl text-[22px] p-2 bg-gray-200 rounded-md">
            Bình luận
          </h3>
          {chapter ? (
            <Form
              className="flex flex-col gap-2 w-full"
              onFinish={handleSubmit(handleUploadComment)}
            >
              <div className="relative w-full">
                <Controller
                  control={control}
                  name="comment"
                  render={({ field }) => (
                    <>
                      <TextArea
                        {...field}
                        maxLength={maxLength}
                        placeholder="Bình luận của bạn..."
                        className="text-lg"
                        style={{ height: 120, resize: "none" }}
                        status={errors.comment ? "error" : ""}
                      />
                      <span className="text-red-500">
                        {errors.comment?.message}
                      </span>
                    </>
                  )}
                />
                <div
                  className={`absolute right-2 bottom-2 text-gray-500 text-sm ${
                    errors.comment ? "bottom-6" : ""
                  }`}
                >
                  {(watch("comment") || "0").length}/{maxLength} ký tự
                </div>
              </div>
              <Button
                htmlType="submit"
                type="primary"
                className="w-fit self-start"
                loading={loading}
              >
                Gửi
              </Button>
            </Form>
          ) : (
            <Skeleton.Input active style={{ width: "100%", height: 120 }} />
          )}
        </div>

        <div className="w-full h-full mt-2">
          {chapter && (
            <Comments
              chapterId={chapter.id}
              commentsChanged={commentsChanged}
              slug={slug as string}
              chapterNumber={Number(chapterNumber)}
              toggleCommentsChanged={toggleCommentsChanged}
            />
          )}
        </div>
      </div>
    </div>
  );
};
