import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Inicio.css";
export default function Inicio() {
  return (
    <>
      <section className="imagenseccion1">
        <Header />
        <div className="d-flex px-5 flex-column gap-3 mt-5">
          <h1 className="text-white tituloseccion1 col-12 col-md-6">
            Encuentra rápidamente a esos compañeros de aventura que tanto buscas
          </h1>
          <hr className="border border-secondary border-2 opacity-25 w-50" />
          <h2 className="text-secondary col-12 col-md-5 text-end fst-italic">
            Descubre nuevos juegos y comunidades
          </h2>
        </div>
      </section>

      <div className="imagenseccion2">
        <hr className="border border-secondary border-2 opacity-25 w-75" />
        <section className="carrousel-inicio">
          <img
            src="../src/assets/Imagenes/battlefield.jpg"
            alt="..."
            className="rounded-start"
          />
          <img src="../src/assets/Imagenes/warzone.jpg" alt="..." />
          <img src="../src/assets/Imagenes/gta.jpg" alt="..." />
          <img src="../src/assets/Imagenes/DayZ.jpg" alt="..." />
          <img src="../src/assets/Imagenes/lol.jpg" alt="..." />
          <img
            src="../src/assets/Imagenes/eldenring3.jpg"
            alt="..."
            className="rounded-end"
          />
        </section>
        <div className="d-flex flex-column align-items-center">
          <hr className="border border-secondary border-2 opacity-25 w-100" />
          <h1 className="text-white">Comparte tus comentarios con amigos</h1>
          <h3 className="text-secondary fst-italic">
            Descubre gamers con nuestro método aleatorio
          </h3>
          <hr className="border border-secondary border-2 opacity-25 w-75" />
          <Link to="login" className="btn btn-primary">
            Únete
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
