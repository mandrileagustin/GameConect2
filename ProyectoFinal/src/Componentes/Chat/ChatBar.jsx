import React, { useEffect, useState } from "react";
import "./Chat.css";

const ChatBar = ({ socket, chat }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h1 className="text-primary">{`Sala: ${chat}`}</h1>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.nickname}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
