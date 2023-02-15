import { useEffect, useState } from "react";
import SearchPlayers from "../../Componentes/SearchPlayers/SearchPlayers";
export default function BuscarJugadoresVista() {
  const [juegos, setJuego] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/juegos`);
        const data = await response.json();
        setJuego(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <SearchPlayers juegos={juegos} />
    </>
  );
}
