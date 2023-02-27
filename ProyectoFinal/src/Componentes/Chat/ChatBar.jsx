import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import "./Chat.css";

const ChatBar = ({ socket, chat }) => {
  const [users, setUsers] = useState([]);
  const { authorization } = useAuthContext();

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h3 className="text-white">{`Sala: ${chat}`}</h3>
      <hr className="border border-primary border-2 opacity-50 w-100" />

      <div>
        {/* <h4 className="chat__header text-secondary">ACTIVE USERS</h4> */}
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.authorization}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
