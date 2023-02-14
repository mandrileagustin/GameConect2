import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Inicio.css";
export default function Inicio() {
  return (
    <>
      <section className="imagenseccion1">
        <Header />
        <div className=" d-flex justify-content-start px-5">
          <h2 className="text-white col-4 tituloseccion1 w-25">
            Encuentra rapido y facil a esos compañeros de aventura que tanto
            buscas
          </h2>
        </div>
      </section>
      <section className="imagenseccion2">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <img
              src="../src/assets/Imagenes/eldenring.jpg"
              alt="..."
              className="imagenseccion"
            />
          </div>
          <div className="flex-grow-1 ms-3">
            <h2 className="tituloseccion1 text-white">
              Descubre nuevos juegos y nuevas comunidades.
            </h2>
            <h3 className="text-secondary">
              Rétate a ti mismo en una batalla de ingenio y habilidades con
              amigos en los que contar.
            </h3>
            <Link
              to="/login"
              className="btn btn-outline-primary px-5"
              aria-current="page"
            >
              Join Us
            </Link>
          </div>
        </div>
      </section>
      <section className="imagenseccion3">
        <div className="container">
          <div className="row">
            <div className="col-9">
              <h1 className="mt-5 text-white">
                Comparte tus aventuras a tus amigos
              </h1>
            </div>
            <div className="col-4">
              <h2 className="text-secondary">
                Sube las fotos de tus aventuras
              </h2>
            </div>
            <div className="col-6">
              <h2 className="text-secondary">
                Unete a chats de tus juegos favoritos
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
