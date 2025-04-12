import { Button, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useApi } from "../hooks";
import { IComment, IGetPagingComment } from "../interfaces";
import { commentApi } from "../apis";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../utils/stores";

type CommentsProps = {
  chapterId: string;
  commentsChanged: boolean;
  slug: string;
  chapterNumber: number;
  toggleCommentsChanged: () => void;
};

export const Comments: React.FC<CommentsProps> = ({
  chapterId,
  commentsChanged,
  slug,
  chapterNumber,
  toggleCommentsChanged,
}) => {
  const { currentUser } = useAuthStore();
  const { "chapter-number": currentChapter } = useParams();
  const { loading, errorMessage, callApi: callCommentApis } = useApi<void>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [visible, setVisible] = useState<number>(4);
  const pageSize = 4;
  const loadMore = () => {
    setPage((prev) => prev + 1);
    setVisible((prev) => prev + 2);
  };

  const handleDeleteComment = async (commentId: string) => {
    await callCommentApis(async () => {
      const { data } = await commentApi.deleteComment(commentId);
      if (data) {
        message.success(data.message, 3);
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
        toggleCommentsChanged();
      }
    });
  };

  useEffect(() => {
    const fetchComments = async () => {
      await callCommentApis(async () => {
        const sendData: IGetPagingComment = {
          chapterId,
          page: page,
          size: pageSize,
        };
        const { data } = await commentApi.getComment(sendData);
        if (data) {
          setComments((prev: IComment[]) => {
            const newCommentsWithoutDuplicate = data.data.filter(
              (newComment: IComment) => {
                return !prev.some(
                  (oldComment: IComment) => oldComment.id === newComment.id
                );
              }
            );
            return [...newCommentsWithoutDuplicate, ...prev];
          });
          setTotal(data.totalItem);
        }
      });
    };
    fetchComments();
  }, [chapterId, page, commentsChanged]);

  useEffect(() => {
    setPage(1);
    setVisible(4);
    setComments([]);
  }, [slug, chapterNumber]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);
  return (
    <div className="w-full flex flex-col gap-4">
      {Number(currentChapter as string) === chapterNumber &&
        comments.slice(0, visible).map((comment) => (
          <div
            key={comment.id}
            className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg"
          >
            <img
              src={comment.user.avatar}
              alt="avatar"
              className="w-[40px] h-[40px]"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-blue-600">
                {comment.user.fullName}
              </span>
              <p className="text-gray-700">{comment.content}</p>
              <span className="text-xs text-gray-500">
                {new Date(comment.createAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>
            <div className="flex-col gap-2 ml-auto">
              {currentUser?.id === comment.user.id && (
                <Button
                  type="link"
                  className="text-red-500"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Xóa
                </Button>
              )}
            </div>
          </div>
        ))}
      {loading && <Spin />}
      {visible < total && (
        <Button
          onClick={loadMore}
          type="link"
          className="self-center text-blue-500"
        >
          Xem thêm
        </Button>
      )}
    </div>
  );
};
