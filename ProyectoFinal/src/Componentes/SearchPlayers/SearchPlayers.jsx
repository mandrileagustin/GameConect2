import { Link } from "react-router-dom";

export default function SearchPlayers() {
  return (
    <>
      <div className=" d-flex justify-content-center mt-5 d-grid gap-4 align-content-center">
        <div className="card text-center w-50">
          <div className="card-header">Buscar jugadores</div>
          <div className="card-body d-grid gap-2">
            <h5 className="card-title">Que estas buscando...</h5>
            <select className="form-select" aria-label="Default select example">
              <option value="">Juego</option>
              <option value="1"></option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <select className="form-select" aria-label="Default select example">
              <option value="">Edad de jugador</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <select className="form-select" aria-label="Default select example">
              <option value="">Plataforma</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <select className="form-select" aria-label="Default select example">
              <option value="">Genero del jugador</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <Link to="/buscandojugador" className="btn btn-primary">
              Buscar jugador
            </Link>
          </div>
          <div className="card-footer text-muted"></div>
        </div>
        <div className="col-3">
          <h1>Encuentra tu compañero ideal</h1>
        </div>
      </div>
    </>
  );
}
