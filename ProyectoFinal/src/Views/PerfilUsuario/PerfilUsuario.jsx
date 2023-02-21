import Usuario from "../../Componentes/Usuario/Usuario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TarjetaPostUsuario from "../../Componentes/TrajetaPostUsuario/TarjetaPostUsuario";
import CardJuegos from "../../Componentes/CardJuegos/CardJuegos";
export default function PerfilUsuario() {
  const { id } = useParams();
  const [postUsuarios, setPostUsuarios] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [juegoUsuarios, setJuegoUsuarios] = useState([]);

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

        const responseJuegos = await fetch(
          `http://localhost:3000/user/juegoUsuario/${id}`
        );
        const dataJuegos = await responseJuegos.json();
        setJuegoUsuarios(dataJuegos);
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
      <div>
        <h2 className="text-white"> Tus Publicaciones</h2>
      </div>
      {postUsuarios.map((postUsuario) => (
        <TarjetaPostUsuario
          key={postUsuario.id}
          comentario={postUsuario.comentario}
          path={postUsuario.path}
          nickname={postUsuario.nickname}
        />
      ))}
      <div className="d-grid gap-3">
        <h2 className="text-white"> Tus Juegos</h2>
        {juegoUsuarios.map((juegoUsuario) => (
          <CardJuegos
            key={juegoUsuario.id}
            nombre={juegoUsuario.nombre}
            imagen={juegoUsuario.imagen}
          />
        ))}
      </div>
    </>
  );
}
