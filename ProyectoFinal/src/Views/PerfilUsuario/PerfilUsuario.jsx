import Usuario from "../../Componentes/Usuario/Usuario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function PerfilUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <Usuario usuario={usuario} />;
}
