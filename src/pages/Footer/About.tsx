import { Link } from "react-router-dom"
import { CustomBreadcrumb, HistoryManga, TopManga } from "../../components"

export const About = () => {
    const items = [{title: <Link to="/">Trang chủ</Link>}, {title: "Giới thiệu"}]

    return (
    <div className="w-full h-full flex justify-center items-center">
        <div className="w-[60%] h-full flex flex-row bg-white p-5">
            <div className="flex flex-col w-full h-full pr-5">
                <CustomBreadcrumb items={items}/>
                <div className="flex flex-col justify-center w-full gap-2 h-full">
                    <h1 className="text-4xl font-bold text-blue-800">
                        Giới thiệu
                    </h1>
                    <p className="text-left">
                    Bạn là người đam mê truyện tranh? Bạn luôn tìm kiếm những tác phẩm mới và hấp dẫn nhất? 
                    Hãy để Oneshot Manga trở thành điểm đến hàng đầu của bạn. 
                    Với hàng ngàn tác phẩm đa dạng và đội ngũ chuyên nghiệp, chúng tôi tự hào giới thiệu mình là một trong những trang web đọc truyện tranh mới nhất 
                    và phong cách nhất trên internet. Chào mừng bạn đến với thế giới đầy màu sắc của Oneshot Manga.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800 text-left w-full">
                        Giới thiệu chung
                    </h2>
                    <p className="text-left">
                    Oneshot Manga không chỉ đơn giản là một trang web đọc truyện tranh, mà còn là một cộng đồng lớn mạnh được xây dựng bởi những người yêu thích truyện tranh, cho những người yêu thích truyện tranh. Chúng tôi cam kết cung cấp cho bạn trải nghiệm đọc truyện tốt nhất có thể. Tại đây, bạn có thể tìm thấy những tác phẩm hot nhất, những bộ truyện tranh mới nhất từ các thể loại khác nhau và thậm chí cả những tác phẩm cổ điển.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800 text-left w-full">
                        Thể loại truyện
                    </h2>
                    <p className="text-left">
                    Oneshot Manga tự hào có sẵn một loạt rất lớn các thể loại truyện tranh đa dạng. Dù bạn là fan hâm mộ của truyện tranh hành động, tình cảm, kỳ ảo, viễn tưởng, võ thuật, trinh thám, hay cả những bộ truyện tranh ngắn hài hước, chúng tôi sẽ đáp ứng đủ mọi sở thích của bạn. Tại Oneshot Manga, bạn sẽ luôn tìm thấy điều gì đó phù hợp với mình, và thậm chí bạn còn có cơ hội khám phá các thể loại mới mẻ mà bạn chưa từng biết đến trước đây. Chúng tôi không ngừng cập nhật và đa dạng hóa thư viện truyện tranh để luôn mang lại điều mới lạ và thú vị cho bạn.                </p>
                    <h2 className="text-2xl font-semibold text-gray-800 text-left w-full">
                        Đội ngũ
                    </h2>
                    <p className="text-left">
                    Oneshot Manga không chỉ là một trang web đọc truyện tranh, mà còn là sự kết hợp của đội ngũ đam mê và chuyên nghiệp. Chúng tôi tự hào có đội ngũ biên tập và quản lý trang web có kinh nghiệm, luôn đặt sự hài lòng của độc giả lên hàng đầu. Chúng tôi đảm bảo rằng truyện tranh trên trang web của chúng tôi luôn được cập nhật thường xuyên, chất lượng đồng đều và được thực hiện bởi những người đam mê nghệ thuật truyện tranh. Ngoài ra, cộng đồng Oneshot Manga cũng đóng góp một phần quan trọng vào sự phát triển của trang web. Chúng tôi luôn hoan nghênh ý kiến đóng góp, góp ý từ phía độc giả và sẵn sàng cải thiện để đáp ứng nhu cầu của cộng đồng truyện tranh ngày một cao cấp hơn.                </p>
                    <h2 className="text-2xl font-semibold text-gray-800 text-left w-full">
                        Độc giả
                    </h2>
                    <p className="text-left">
                    Oneshot Manga hoan nghênh mọi độc giả, từ trẻ em đến người trưởng thành. Chúng tôi cung cấp nội dung phù hợp với độ tuổi và đảm bảo rằng mọi người đều có thể tìm thấy truyện tranh phù hợp với sở thích của họ. Dù bạn là một người đọc truyện tranh lâu năm hay mới bắt đầu khám phá thế giới này, Oneshot Manga sẽ là bạn đồng hành đáng tin cậy. Ngoài ra, trang web của chúng tôi cũng có tính năng tùy chỉnh và đánh giá, giúp bạn dễ dàng tìm kiếm và chia sẻ truyện tranh yêu thích với bạn bè.                </p>
                    <h2 className="text-2xl font-semibold text-gray-800 text-left w-full">
                        Thông tin Liên hệ
                    </h2>
                    <p className="text-left">
                    Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn và cung cấp hỗ trợ khi bạn cần. Nếu bạn có bất kỳ câu hỏi hoặc góp ý, vui lòng liên hệ với chúng tôi thông qua địa chỉ <Link to="/#" className="text-blue-400">email</Link>. Hoặc trang <Link to="/contact" className="text-blue-400">Liên hệ</Link> của chúng tôi. Chúng tôi rất trân trọng mọi đóng góp từ bạn, và sẽ cố gắng để đảm bảo rằng Oneshot Manga luôn là nơi tốt nhất để bạn thỏa mãn đam mê truyện tranh của mình. Hãy cùng chúng tôi khám phá thế giới tuyệt vời của truyện tranh tại Oneshot Manga - nơi mọi câu chuyện hình ảnh được truyền tải và biểu đạt một cách tinh tế và đầy sáng tạo. Đừng bỏ lỡ cơ hội tham gia cùng hàng triệu độc giả khác để thả mình vào những trải nghiệm độc đáo và tuyệt vời, chỉ có tại Oneshot Manga!                </p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-[40%] gap-2 text-right">
                <HistoryManga />
                <TopManga />
            </div>
        </div>
    </div>
  )
}
