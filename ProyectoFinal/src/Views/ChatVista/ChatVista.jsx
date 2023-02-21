import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "../../Componentes/Chat/Chat";
export default function ChatVista() {
  // const [chat, setChat] = useState([]);

  // async function GetChat() {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   fetch(`http://localhost:3000/chat`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   }).then((response) => {
  //     if (response.status === 400) {
  //       alert("error al recibir el body");
  //     } else if (response.status === 200) {
  //       setChat(`usuario ${values.nombre} registrado correctamente`);
  //     } else if (response.status === 409) {
  //       alert("usuario ya registrado");
  //     }
  //   });
  return (
    <>
      <Chat />
    </>
  );
}
