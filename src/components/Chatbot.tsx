import { useEffect, useState } from "react";
import { Button, Input, message, Popover } from "antd";
import { icons } from "../utils/icons";
import { useApi, useBoolean } from "../hooks";
import { useAuthStore } from "../utils/stores";
import { IChatbotRequest } from "../interfaces";
import { chatbotApi } from "../apis";

export const Chatbot = () => {
  const { currentUser, isLogin } = useAuthStore();
  const { loading, errorMessage, callApi: callChatbotApis } = useApi<void>();

  const { value: open, toggle: toggleChat } = useBoolean(false);

  const [sendMessage, setSendMessage] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string[]>([]);
  const [historyMessage, setHistoryMessage] = useState<string[]>([]);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleSendMessage = async () => {
    await callChatbotApis(async () => {
      const sendData: IChatbotRequest = {
        message: sendMessage,
        ...(currentUser?.id && { userId: currentUser.id }),
      };
      const { data } = await chatbotApi.sendMessage(sendData);
      if (data) {
        setResponseMessage((prev) => [...prev, data]);
        setSendMessage("");
      }
    });
  };

  const handleHistoryMessageClick = (message: string) => {
    setSendMessage(message);
  };

  useEffect(() => {
    const fetchHistoryChat = async (userId: string) => {
      await callChatbotApis(async () => {
        const { data } = await chatbotApi.getChatHistory(userId);
        if (data) {
          setHistoryMessage(data);
        }
      });
    };
    setSendMessage("");
    setResponseMessage([]);
    setHistoryMessage([]);
    if (isLogin && currentUser) {
      fetchHistoryChat(currentUser.id);
    }
  }, [isLogin, currentUser]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const popoverContent = (
    <div className="w-[400px] h-[400px] bg-white flex flex-col">
      <div className="font-bold text-center border-b py-2">
        Hãy cho tôi biết thể loại bạn muốn đọc
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-sm text-gray-700 flex flex-col">
        <div className="text-gray-500 italic text-center">
          Chào bạn! Tôi có thể giúp gì cho bạn?
        </div>

        {historyMessage.map((msg, index) => (
          <div key={`history-${index}`} className="flex justify-end">
            <div
              className="bg-blue-100 text-blue-800 p-2 rounded-lg max-w-[80%] cursor-pointer self-end"
              onClick={() => handleHistoryMessageClick(msg)}
            >
              {msg}
            </div>
          </div>
        ))}

        {responseMessage.map((msg, index) => (
          <div key={`response-${index}`} className="flex justify-start">
            <div className="bg-gray-100 p-2 rounded-lg max-w-[80%]">{msg}</div>
          </div>
        ))}
      </div>

      <div className="p-2 flex gap-2 border-t">
        <Input
          placeholder="Nhập tin nhắn..."
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          onPressEnter={handleSendMessage}
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
          loading={loading}
          disabled={!sendMessage}
        >
          Gửi
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Popover
        content={popoverContent}
        title={null}
        trigger="click"
        open={open}
        onOpenChange={toggleChat}
        placement="topRight"
        className="z-50"
      >
        <Button
          type="primary"
          shape="circle"
          icon={icons.message}
          size="large"
          className={`fixed right-5 ${
            scrollPosition > 200 ? "bottom-16" : "bottom-5"
          } bg-blue-500 text-white p-3 rounded-full shadow-md`}
        />
      </Popover>
    </div>
  );
};
