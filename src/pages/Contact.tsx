import { HistoryManga, TopManga } from "../components"

export const Contact = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
        <div className="w-[60%] h-full flex flex-row justify-center items-center bg-white p-5">
            <div className="flex flex-col justify-center w-[60%] gap-2 h-full">
                <h1 className="text-4xl font-bold text-blue-800">
                    Liên hệ
                </h1>
                <p className="text-left">
                Chào bạn! Chúng tôi rất vui mừng khi bạn đang xem xét liên hệ với chúng tôi. Tại đây, chúng tôi rất trân trọng mọi ý kiến, góp ý và câu hỏi của bạn. Hãy cảm thấy tự do để liên hệ với chúng tôi bất cứ lúc nào.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 text-left w-full">
                    Thông tin liên hệ cơ bản
                </h2>
                <p className="text-left">
                Bạn có thể kết nối với chúng tôi thông qua mạng xã hội. Chúng tôi có mặt trên Facebook, nơi bạn có thể cập nhật thông tin mới nhất, tham gia thảo luận và nhận thông báo về truyện tranh mới sớm nhất. Đừng ngần ngại liên hệ với chúng tôi. Chúng tôi sẵn sàng hỗ trợ bạn và tạo ra trải nghiệm tốt nhất cho bạn trên Oneshot Manga. Cảm ơn bạn đã ủng hộ chúng tôi! Chúng tôi sẵn sàng hỗ trợ bạn mọi lúc, 24/7.                </p>
                <h2 className="text-2xl font-semibold text-gray-800 text-left w-full">
                    Chúng tôi cam kết
                </h2>
                <p className="text-left">
                Chúng tôi sẽ luôn lắng nghe ý kiến của bạn và xem xét mọi góp ý một cách nghiêm túc. Chúng tôi sẽ cố gắng giải quyết mọi câu hỏi hoặc vấn đề một cách nhanh chóng và hiệu quả. Sự riêng tư của bạn rất quan trọng đối với chúng tôi, và thông tin liên hệ của bạn sẽ được bảo mật.                </p>
            </div>
            <div className="flex flex-col justify-center items-center w-[40%] gap-2 text-right">
                <HistoryManga />
                <TopManga />
            </div>
        </div>
    </div>
  )
}
