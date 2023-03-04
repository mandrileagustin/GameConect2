import SearchPlayers from "../../Componentes/SearchPlayers/SearchPlayers";
import Footer from "../../Componentes/Footer/Footer";

export default function BuscarJugadoresVista() {
  return (
    <>
      <div className="mb-5">
        <SearchPlayers />
      </div>
      <div className="py-5">
        <Footer />
      </div>
    </>
  );
}
