import { Button } from "antd";
import { useState } from "react";

const comments = [
  {
    id: 1,
    username: "Nguyễn Văn A",
    avatar: "/assets/avatar.png",
    content: "Bình luận 1",
    createAt: "2 giờ trước",
  },
  {
    id: 2,
    username: "Trần Thị B",
    avatar: "/assets/avatar.png",
    content: "Bình luận 2",
    createAt: "3 giờ trước",
  },
  {
    id: 3,
    username: "Lê Văn C",
    avatar: "/assets/avatar.png",
    content: "Bình luận 3",
    createAt: "1 ngày trước",
  },
  {
    id: 4,
    username: "Phạm Thị D",
    avatar: "/assets/avatar.png",
    content: "Bình luận 4",
    createAt: "2 ngày trước",
  },
  {
    id: 5,
    username: "Hoàng Văn E",
    avatar: "/assets/avatar.png",
    content: "Bình luận 5",
    createAt: "3 ngày trước",
  },
  {
    id: 6,
    username: "Ngô Thị F",
    avatar: "/assets/avatar.png",
    content: "Bình luận 6",
    createAt: "4 ngày trước",
  },
];

export const Comments = () => {
  const [visibleCount, setVisibleCount] = useState(2);
  const loadMore = () => setVisibleCount((prev) => prev + 2);

  return (
    <div className="w-full flex flex-col gap-4">
      {comments.slice(0, visibleCount).map((comment) => (
        <div
          key={comment.id}
          className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg"
        >
          <img
            src={comment.avatar}
            alt="avatar"
            className="w-[40px] h-[40px]"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-blue-600">
              {comment.username}
            </span>
            <p className="text-gray-700">{comment.content}</p>
            <span className="text-xs text-gray-500">{comment.createAt}</span>
          </div>
        </div>
      ))}

      {visibleCount < comments.length && (
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
