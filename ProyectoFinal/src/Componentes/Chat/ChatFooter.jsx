import React, { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";

import "./Chat.css";

export default function ChatFooter({ socket, sendMessage }) {
  const [message, setMessage] = useState("");
  const { authorization } = useAuthContext();

  const handleTyping = () =>
    socket.emit(
      "typing",
      `${localStorage.getItem(authorization.nickname)} is typing`
    );

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
