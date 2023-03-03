import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import "./Chat.css";

export default function ChatBody({
  messages,
  lastMessageRef,
  typingStatus,
  joinRoom,
}) {
  const navigate = useNavigate();
  const { authorization } = useAuthContext();

  const handleLeaveChat = () => {
    localStorage.removeItem(authorization.nickname);
    navigate("/home");
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <button className="boton-salir" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
        <hr className="border border-primary border-2 opacity-25 h-100" />

        <button onClick={joinRoom} className="btn btn-secondary sala-hover">
          Unirse al chat
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">
        {messages.map((message) => {
          if (message.name === authorization.nickname) {
            return (
              <div className="message__chats" key={message.id}>
                <p className="sender__name text-primary">You</p>
                <div className="message__sender">
                  <p>{message.message}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="message__chats" key={message.id}>
                <p className="text-white">{message.name}</p>
                <div className="message__recipient">
                  <p className="text-white">{message.message}</p>
                </div>
              </div>
            );
          }
        })}

        <div className="message__status text-secondary">
          <p>{typingStatus}...</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
}
