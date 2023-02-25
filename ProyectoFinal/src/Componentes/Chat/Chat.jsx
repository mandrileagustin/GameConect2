import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

import { useAuthContext } from "../../Context/AuthContext";

export default function Chat({ chat }) {
  const socket = io.connect("http://localhost:3001");
  //Mensages
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  const { authorization } = useAuthContext();

  const joinRoom = () => {
    socket.emit("join_room", chat);
  };

  const sendMessage = (e, message) => {
    e.preventDefault();
    const id = `${socket.id}${Math.random()}`;
    socket.emit("send_message", {
      name: authorization.nickname,
      id,
      message,
      room: chat,
    });
    setMessage("");
    console.log(messageReceived, "este es el de chat.jsx");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((previousMessages) => [...previousMessages, data]);
    });
  }, [socket]);

  /////////////////////////////////////////
  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    //scroll cada vez que se manda un mensaje
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageReceived]);

  return (
    <>
      <div className="container ubicacion-chat">
        <div className="chat">
          <ChatBar socket={socket} chat={chat} />
          <div className="chat__main">
            <ChatBody
              messages={messageReceived}
              lastMessageRef={lastMessageRef}
              typingStatus={typingStatus}
              joinRoom={joinRoom}
            />

            <ChatFooter socket={socket} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </>
  );
}
