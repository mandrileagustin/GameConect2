import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

export default function Chat({ chat }) {
  const socket = io.connect("http://localhost:3001");
  //Mensages
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  const joinRoom = () => {
    socket.emit("join_room", chat);
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room: chat });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageReceived(data);
    });
  }, [socket]);

  /////////////////////////////////////////

  useEffect(() => {
    // 👇️ scroll cada vez que se manda un mensaje
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <>
      <div className="ubicacion-chat">
        <div className="d-flex flex-column ">
          <h1 className="text-primary">{`Sala: ${chat}`}</h1>

          <button onClick={joinRoom} className="btn btn-outline-primary ">
            Join
          </button>
        </div>
        <div className="chat">
          <ChatBar socket={socket} />
          <div className="chat__main">
            <ChatBody
              messages={messages}
              lastMessageRef={lastMessageRef}
              typingStatus={typingStatus}
            />
            <ChatFooter socket={socket} />
          </div>
        </div>
      </div>
    </>
  );
}
