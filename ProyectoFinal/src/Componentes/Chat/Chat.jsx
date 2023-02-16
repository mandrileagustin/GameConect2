import io from "socket.io-client";
import { useEffect, useState } from "react";

// const socket = io.connect("http://localhost:3001");
export default function Chat() {
  // Salas
  const [room, setRoom] = useState("");

  //Mensages
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <>
      <div className="d-flex justify-content-center mt-5 ">
        <div className="col-4">
          <h1>Chat App</h1>
          <div className="form-floating col-6">
            <input
              placeholder="Room"
              className="form-control"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={joinRoom} className="btn btn-outline-primary">
            Join
          </button>

          <div className="form-floating col-6">
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
          <div>
            <h1 className="text-dark">{messageReceived}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
