import { useEffect, useState } from "react";
import CardPublicar from "../../Componentes/CardPublicar/CardPublicar";
import Footer from "../../Componentes/Footer/Footer";
import TarjetaPost from "../../Componentes/TarjetaPost/TarjetaPost";

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
        <div className="d-flex flex-column align-items-center">
          <hr className="border border-white border-2 opacity-25 w-50" />
          <TarjetaPost
            key={postUsers.id}
            comentario={postUsers.comentario}
            path={postUsers.path}
            nickname={postUsers.nickname}
          />
        </div>
      ))}
      <Footer />
    </>
  );
}
