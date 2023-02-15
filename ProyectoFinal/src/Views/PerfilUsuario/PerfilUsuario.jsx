import Usuario from "../../Componentes/Usuario/Usuario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TarjetaPost from "../../Componentes/TrajetaPostUsuario/TarjetaPostUsuario";
export default function PerfilUsuario() {
  const { id } = useParams();

  // const { path } = useParams();
  const [usuario, setUsuario] = useState([]);
  const [postUsuarios, setPostUsuarios] = useState([]);

  // const [pathPost, setPathPost] = useState([]);

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/post/postUsuario/${idUsuario}`
  //       );
  //       const data = await response.json();
  //       setPostUsuarios(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/post/post/${path}`);
  //       const data = await response.json();
  //       setPathPost(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
        />
      ))}
    </>
  );
}
