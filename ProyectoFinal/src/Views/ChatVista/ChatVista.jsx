import { useParams } from "react-router-dom";
import Chat from "../../Componentes/Chat/Chat";

export default function ChatVista() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Chat chat={id} />
    </>
  );
}
