import { useState } from "react";
import { 
  Button, 
  Select 
} from "antd";
import { Link } from "react-router-dom";

import { icons } from "../utils/icons";

const chaptersData = Array.from({ length: 334 }, (_, i) => ({
  id: 334 - i,
  title: `${334 - i}`,
}));

export const ChapterNavigation = () => {
  const [currentChapter, setCurrentChapter] = useState(334);
  const [isFollow] = useState(true)

  const handleChangeChapter = (value: number) => {
    setCurrentChapter(value);
  };

  return (
    <div
      className="sticky top-[46px] left-0 w-full bg-slate-200 flex items-center justify-center p-2 transition-transform duration-300 translate-y-0"
    >
    <div className="flex items-center gap-2">
      <Link to={"/"} className="text-lg mr-3">{icons.home}</Link>
      <Button icon={icons.left} type="primary" onClick={() => handleChangeChapter(currentChapter - 1)} disabled={currentChapter === 1}/>
      <Select
        value={currentChapter}
        onChange={handleChangeChapter}
        className="w-40"
        options={chaptersData.map((chapter) => ({
        value: chapter.id,
        label: `Chapter ${chapter.title}`,
        }))}
      />
      <Button icon={icons.right} type="primary" onClick={() => handleChangeChapter(currentChapter + 1)} disabled={currentChapter === 334}/>
      <Button
        className={`flex items-center gap-2 p-4 text-base rounded-md text-white hover:!bg-white transition-all duration-300 ${
            isFollow
            ? "bg-red-500"
            : "bg-blue-500"
        }`}
      >
        {icons.heart}
        {isFollow ? "Hủy theo dõi" : "Theo dõi"}
      </Button>
    </div>
    </div>
  );
};