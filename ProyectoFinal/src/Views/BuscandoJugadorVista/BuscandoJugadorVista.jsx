import { useEffect, useState } from "react";
import BuscandoJugador from "../../Componentes/BuscandoJugador/BuscandoJugador";

export default function BuscandoJugadorVista() {
  const [plataforma, setPlataforma] = useState([]);
  const [juego, setJuego] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/juegos/match`);
        const data = await response.json();
        setJuego(data);

        const responsePlataforma = await fetch(
          `http://localhost:3000/juegos/match`
        );
        const dataPlataforma = await responsePlataforma.json();
        setPlataforma(dataPlataforma);
      } catch (error) {
        console.log(error);
      }
      console.log();
    };
    fetchData();
  }, []);
  return (
    <>
      <BuscandoJugador plataforma={plataforma} juego={juego} />
    </>
  );
}
