import { useWebSocket } from "../hooks";

export const TestWebSocket = () => {
  const messageUser1 = useWebSocket({
    userId: "4a023136-c00d-4131-919c-e3155d7f5444",
  });

  const messageUser2 = useWebSocket({
    userId: "37dba83c-dd99-442c-8ef7-f0e61fb8e1a1",
  });
  return (
    <div>
      <p>Notifications for dolongnhat0301@gmail.com:</p>
      {messageUser1 && <p>{messageUser1}</p>}
      <br />
      <br />
      <p>Notifications for dolongnhat0302@gmail.com:</p>
      {messageUser2 && <p>{messageUser2}</p>}
    </div>
  );
};
