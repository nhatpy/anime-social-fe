import { useState } from "react";
import { 
  Button
  , Card 
} from "antd";
import { Link } from "react-router-dom";

interface Manga {
  id: string;
  title: string;
  description: string;
  categories: string[];
  coverImage: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  createdAt: string;
}

const mangaData: Manga = {
  id: "1",
  title: "One Piece",
  description: "Hành trình tìm kiếm kho báu One Piece của Luffy.",
  categories: ["Hành động", "Phiêu lưu", "Hài hước"],
  coverImage: "/assets/one-piece.jpg",
  chapters: [
    { id: "1", title: "Chương 1: Ra khơi", createdAt: "2024-02-20" },
    { id: "2", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "3", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "4", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "5", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "6", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "7", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "8", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "9", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "10", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "11", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "12", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "13", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "14", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "15", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "16", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "17", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "18", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "19", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "20", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "21", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "22", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "23", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
    { id: "24", title: "Chương 2: Gặp Zoro", createdAt: "2024-02-21" },
  ],
};

export const MangaCreateDetail = () => {
    const [manga] = useState<Manga>(mangaData);
    const [visibleChapters, setVisibleChapters] = useState(5);
  
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Thông tin Manga */}
        <Card className="shadow-lg">
          <div className="flex gap-4">
            <img src={manga.coverImage} alt={manga.title} className="w-40 h-60 object-cover rounded-md" />
            <div className="flex-1 space-y-3">
              <h1 className="text-2xl font-bold">{manga.title}</h1>
              <p className="text-gray-600">{manga.description}</p>
              <div className="text-sm text-gray-500">
                <strong>Thể loại:</strong> {manga.categories.join(", ")}
              </div>
            </div>
          </div>
        </Card>
  
        <Card 
            title="Danh sách Chapter" 
            extra={
                <Link to="/manga/create-manga/chuyen-sinh-thanh-lieu-dot-bien/create-chapter">
                    <Button type="primary" className="!bg-blue-500 hover:!bg-blue-600 !text-white rounded-lg">
                        Thêm Chapter
                    </Button>
                </Link>
            }
        >
          <ul className="space-y-2">
            {manga.chapters.slice(0, visibleChapters).map((chapter) => (
              <li key={chapter.id} className="flex justify-between items-center p-2 border-b">
                <span className="text-lg">{chapter.title}</span>
                <span className="text-sm text-gray-500">{chapter.createdAt}</span>
              </li>
            ))}
          </ul>
  
          {visibleChapters < manga.chapters.length && (
            <div className="text-center mt-3">
              <Button onClick={() => setVisibleChapters(manga.chapters.length)}>Xem thêm</Button>
            </div>
          )}
        </Card>
      </div>
    );
  }