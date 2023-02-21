import { useEffect, useState } from "react";

import Chat from "../../Componentes/Chat/Chat";
import { useAuthContext } from "../../Context/AuthContext";
export default function ChatVista() {
  const [chat, setChat] = useState("");
  const { authorization } = useAuthContext;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/chat/${authorization.id}`
        );
        const data = await response.json();
        setChat(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Chat chat={chat.nombre} />
    </>
  );
}
