import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import "./Chat.css";

export default function Chat({ chat }) {
  const socket = io.connect("http://localhost:3001");
  //Mensages
  const [message, setMessage] = useState([]);
  const [messageReceived, setMessageReceived] = useState("");
  const [messageSent, setMessageSent] = useState([]);
  const lastMessageRef = useRef(null);

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
    ///mostrar mensajes enviados en pantalla
    socket.on("receive_message", (data) => setMessageSent([...message, data]));
  }, [socket, messageSent]);

  useEffect(() => {
    //scroll cada vez que se manda un mensaje
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageSent]);

  return (
    <>
      <div className="ubicacion-chat">
        <div className="d-flex flex-column ">
          <h1 className="text-primary">{`Sala: ${chat}`}</h1>

          <button onClick={joinRoom} className="btn btn-outline-primary ">
            Join
          </button>
        </div>
        <div className="d-flex justify-content-center d-grid gap-3 flex-column">
          <h3 className="text-secondary">{message}</h3>
          <h2 className="text-white">{messageReceived}</h2>
          <div ref={lastMessageRef} />
        </div>

        <div className="posicion-send">
          <div className="form-floating">
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
