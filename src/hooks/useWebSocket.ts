import { useEffect, useState } from "react";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type WebSocketHookProps = {
  userId?: string;
};

export const useWebSocket = ({ userId }: WebSocketHookProps) => {
  const [messages, setMessages] = useState<string[] | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS("https://localhost:8080/api/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe("/topic/notifications", (notification: Message) => {
          setMessages((prev) => [...(prev || []), `${notification.body}`]);
          console.log("Subscribed to public channel");
        });

        stompClient.subscribe(`/queue/notifications/${userId}`, (notification: Message) => {
          setMessages((prev) => [...(prev || []), `${notification.body}`]);
          console.log("Subscribed to private channel");
        });
      },
      onStompError: (error) => {
        console.error("WebSocket error:", error);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [userId]);

  return messages;
};
