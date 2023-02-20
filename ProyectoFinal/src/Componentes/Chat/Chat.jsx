import io from "socket.io-client";
import { useEffect, useState } from "react";

export default function Chat() {
  const socket = io.connect("http://localhost:3001");
  //Mensages
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    socket.emit("join_room", "sala1");
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room: "sala1" });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageReceived(data);
    });
  }, [socket]);
  return (
    <>
      <div className="d-flex justify-content-center mt-5 ">
        <div className="col-4">
          <h1>Chat App</h1>

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
