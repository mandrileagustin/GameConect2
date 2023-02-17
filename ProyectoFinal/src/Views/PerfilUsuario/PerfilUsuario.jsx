import Usuario from "../../Componentes/Usuario/Usuario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TarjetaPost from "../../Componentes/TrajetaPostUsuario/TarjetaPostUsuario";
export default function PerfilUsuario() {
  const { id } = useParams();
  const [postUsuarios, setPostUsuarios] = useState([]);
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        const data = await response.json();
        setUsuario(data);

        const responsePost = await fetch(
          `http://localhost:3000/post/postUsuario/${id}`
        );
        const dataPost = await responsePost.json();
        setPostUsuarios(dataPost);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Usuario
        usuario={usuario}

        // pathPost={pathPost}
      />
      {postUsuarios.map((postUsuario) => (
        <TarjetaPost
          key={postUsuario.id}
          comentario={postUsuario.comentario}
          postPath={postUsuario.path}
          nickname={postUsuario.nickname}
        />
      ))}
    </>
  );
}
