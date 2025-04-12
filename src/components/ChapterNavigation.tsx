import { Button, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { icons } from "../utils/icons";

type ChapterNavigationProps = {
  numberOfChapter: number[];
  currentChapter: number;
  mangaSlug: string;
};

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  numberOfChapter,
  currentChapter,
  mangaSlug,
}) => {
  const navigate = useNavigate();
  const handleChangeChapter = (chapterNumber: number) => {
    navigate(`/manga/${mangaSlug}/${chapterNumber}`);
  };

  return (
    <div className="sticky top-[44px] left-0 w-full bg-slate-200 flex items-center justify-center p-2 transition-transform duration-300 translate-y-0">
      <div className="flex items-center gap-2">
        <Link to={"/"} className="text-lg mr-3">
          {icons.home}
        </Link>
        <Button
          icon={icons.left}
          type="primary"
          onClick={() => handleChangeChapter(currentChapter - 1)}
          disabled={
            currentChapter === numberOfChapter[numberOfChapter.length - 1]
          }
        />
        <Select
          value={currentChapter}
          onChange={handleChangeChapter}
          className="w-40"
          options={numberOfChapter.map((chapterNumber) => ({
            value: chapterNumber,
            label: `Chapter ${chapterNumber}`,
          }))}
        />
        <Button
          icon={icons.right}
          type="primary"
          onClick={() => handleChangeChapter(currentChapter + 1)}
          disabled={currentChapter === numberOfChapter[0]}
        />
      </div>
    </div>
  );
};
