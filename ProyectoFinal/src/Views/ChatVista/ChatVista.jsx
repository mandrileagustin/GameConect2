import { useParams } from "react-router-dom";
import Chat from "../../Componentes/Chat/Chat";
import MenuChat from "../../Componentes/Menu/MenuChat";

export default function ChatVista() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Chat chat={id} />
    </>
  );
}
