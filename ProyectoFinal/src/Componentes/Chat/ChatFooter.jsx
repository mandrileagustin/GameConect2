import React, { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import MY_AUTH_APP from "../const/const";

import "./Chat.css";

export default function ChatFooter({
  socket,
  sendMessage,
  setMessage,
  message,
}) {
  //const [message, setMessage] = useState("");
  const { authorization } = useAuthContext();

  const nickname = localStorage.getItem(MY_AUTH_APP);
  const parseNickname = JSON.parse(nickname);
  console.log(nickname);
  console.log(parseNickname);

  const handleTyping = () =>
    socket.emit("typing", `${parseNickname.nickname} esta escribiendo`);

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={(e) => sendMessage(e, message)}>
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          //Esto manda un evento cuando se escribe un mensaje a Socket.io
          onKeyDown={handleTyping}
        />
        <button className="sendBtn btn btn-primary me-5 py-2">
          <i class="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  );
}
