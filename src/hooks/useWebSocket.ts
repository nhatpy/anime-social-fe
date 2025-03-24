import { useEffect, useState } from "react";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type WebSocketHookProps = {
    userId: string; 
};

export const useWebSocket = ({ userId }: WebSocketHookProps) => {
    const [messages, setMessages] = useState<string[] | null>(null);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/api/ws");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("successfully connected");

                stompClient?.subscribe("/topic/notifications", (notification: Message) => {
                    setMessages((prev) => [...(prev || []), `${notification.body}`]);
                    console.log("public channel connected!");
                });

                stompClient?.subscribe(`/queue/notifications/${userId}`, (notification: Message) => {
                    console.log(notification);
                    setMessages((prev) => [...(prev || []), `${notification.body}`]);
                    console.log("private channel connected!");
                });
                
            },
            onStompError: (error) => {
                console.error("error when handshake:", error);
            },
        });

        stompClient.activate();

        return () => {
            stompClient?.deactivate();
        };
    }, [userId]); 

    return messages;
};
