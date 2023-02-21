import io from "socket.io-client";
import { useEffect, useState } from "react";
import "./Chat.css";

export default function Chat(nombre) {
  const socket = io.connect("http://localhost:3001");
  //Mensages
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    socket.emit("join_room", nombre);
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room: nombre });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageReceived(data);
    });
  }, [socket]);
  return (
    <>
      <div className="ubicacion-chat">
        <div className="d-flex flex-column ">
          <h1>Chat App</h1>

          <button onClick={joinRoom} className="btn btn-outline-primary ">
            Join
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <h1 className="text-white">{messageReceived}</h1>
        </div>
        <div className="posicion-send">
          <div className="form-floating ">
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <label>Message</label>
          </div>
          <button onClick={sendMessage} className="btn btn-outline-primary">
            Send
          </button>
        </div>
      </div>
    </>
  );
}
