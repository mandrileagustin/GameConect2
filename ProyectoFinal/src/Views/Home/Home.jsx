import { useEffect, useState } from "react";
import CardPublicar from "../../Componentes/CardPublicar/CardPublicar";
import TarjetaPost from "../../Componentes/TrajetaPostUsuario/TarjetaPostUsuario";

export default function Home() {
  const [allUserPost, setAllUserPost] = useState([]);

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/post`);
        const data = await response.json();
        setAllUserPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fechData();
  }, []);

  return (
    <>
      <CardPublicar />
      {allUserPost.map((postUsers) => (
        <TarjetaPost key={postUsers.id} comentario={postUsers.comentario} />
      ))}
    </>
  );
}
