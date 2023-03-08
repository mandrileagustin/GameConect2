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
        console.log(dataPost);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      <div className="container">
        <div className="mb-3">
          <Usuario usuario={usuario} />
        </div>

        <hr className="border border-primary border-2 opacity-25 w-100" />
        <div>
          <h2 className="text-white text-center"> Tus Publicaciones</h2>
        </div>
        <div className="d-flex flex-wrap d-grid gap-5 justify-content-center">
          {postUsuarios.map((postUsuario) => (
            <div key={postUsuario.idpost}>
              <TarjetaPostUsuario
                comentario={postUsuario.comentario}
                path={postUsuario.path}
                nickname={postUsuario.nickname}
                idpost={postUsuario.idpost}
                setPostUsuarios={setPostUsuarios}
              />
            </div>
          ))}
        </div>
        <hr className="border border-primary border-2 opacity-25 w-100" />
        <div className="d-grid gap-4">
          <h2 className="text-white text-center"> Tus Juegos</h2>
          <div className="d-flex flex-wrap d-grid gap-5 mb-5 justify-content-center">
            {juegoUsuarios.map((juegoUsuario) => (
              <CardJuegos
                key={juegoUsuario.id}
                nombre={juegoUsuario.nombre}
                imagen={juegoUsuario.imagen}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
