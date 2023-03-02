import { Link } from "react-router-dom";
import "./BuscarJugadores.css";
export default function BuscandoJugador({
  plataforma,
  nickname,
  idSala,
  avatar,
}) {
  return (
    <>
      <div className="card card-buscar-jugadores" style={{ width: "18rem" }}>
        <img
          src={`http://localhost:3000/${avatar}`}
          style={{ height: "20rem", objectFit: "cover" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h4 className="card-text text-primary">{nickname}</h4>
          <p className="card-text text-white">{plataforma}</p>
          <div className="d-grid gap-2">
            <Link className="btn btn-primary" to={`/chat/${idSala}`}>
              Conectar sala
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
