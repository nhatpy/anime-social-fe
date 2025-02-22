import { 
  Button, 
  Form, 
  Input 
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom"

import { 
  ChapterNavigation, 
  Comments, 
  CustomBreadcrumb 
} from "../../components"


const { TextArea } = Input;

const chapterImg = Array.from({ length: 10 }, (_, i) => ({src: `/assets/images.jpg`, alt: `Chapter ${i + 1}`}));

export const ChapterDetail = () => {
    const items = [{title: <Link to="/">Trang chủ</Link>}, {title: <Link to="/search">Thể loại</Link>},
    {title: <Link to="/manga/chuyen-sinh-thanh-lieu-dot-bien">Chuyển sinh thành liễu đột biến</Link>},
    {title: <p>Chapter 10</p>}]
    const [text, setText] = useState("");
    const maxLength = 300;
  
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5">
        <div className="flex flex-col justify-center w-full">
          <CustomBreadcrumb items={items}/>
        </div>
        <div className="flex flex-col w-full h-fit-content gap-5">
          <h3 className="text-2xl text-[22px]">Chuyển sinh thành liễu đột biến - Chapter 10 <span className="text-sm italic text-gray-500">[Cập nhật lúc: 20/02/2025 22:31:06]</span></h3>
          <ChapterNavigation />
          <div className="w-full flex flex-col gap-1">
            {
              chapterImg.map((item, index) => (
                <img key={index} src={item.src} alt={item.alt} className="w-full h-full object-cover" />
              ))
            }
          </div>
          <div className="flex flex-col justify-center w-full">
            <CustomBreadcrumb items={items}/>
          </div>
        </div>
        <div className="flex flex-col w-full h-fit-content gap-5">
          <h3 className="text-2xl text-[22px] p-2 bg-gray-200 rounded-md">Bình luận</h3>
          <Form className="flex flex-col gap-2 w-full">
              <div className="relative w-full">
              <TextArea
                value={text}
                maxLength={maxLength}
                onChange={handleChange}
                placeholder="Bình luận của bạn..."
                className="text-lg"
                style={{ height: 120, resize: "none" }}
              />
              <div className="absolute right-2 bottom-2 text-gray-500 text-sm">
                {text.length}/{maxLength} ký tự
              </div>
            </div>
            <Button htmlType="submit" type="primary" className="w-fit self-start">
              Gửi
            </Button>
          </Form>
        </div>
        <div className="w-full h-full mt-2">
          <Comments />
        </div>
      </div>
    </div>
  )
}
