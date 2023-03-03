import { useAuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  const { authorization } = useAuthContext();
  const { logout } = useAuthContext();

  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-3">
          <div className="mt-3">
            <button
              className="btn btn-dark py-3"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              <i className="bi bi-list text-primary"></i>
            </button>
            <div
              className="offcanvas offcanvas-start barra-navegacion "
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <h2
                  className="offcanvas-title text-primary fst-italic"
                  id="offcanvasExampleLabel"
                >
                  GameConnect
                </h2>
                <button
                  type="button"
                  className="btn-close bg-primary"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className=" d-grid gap-2 text-center">
                  <hr className="border border-primary border-1 opacity-25 w-100" />
                  <Link className="text-decoration-none sala-hover" to="/Home">
                    <h3 className="fst-italic">Feed</h3>
                  </Link>
                  <hr className="border border-primary border-1 opacity-25 w-100" />
                  <Link
                    className="text-decoration-none sala-hover"
                    to={`/perfilUsuario/${authorization.id}`}
                  >
                    <h3 className="fst-italic">Mis Juegos</h3>
                  </Link>
                  <hr className="border border-primary border-1 opacity-25 w-100" />
                  <Link
                    className="text-decoration-none sala-hover"
                    to="/buscarjugador"
                  >
                    <h3 className="fst-italic">Buscar Jugadores</h3>
                  </Link>
                  <hr className="border border-primary border-1 opacity-25 w-100" />
                </div>
                <div className="position-absolute bottom-0 start-0 mb-4 ms-4">
                  <Link
                    className="text-decoration-none text-white"
                    to={`/perfilUsuario/${authorization.id}`}
                  >
                    <h4 className="fst-italic">Mi perfil</h4>
                  </Link>
                  <hr className="border border-primary border-1 opacity-25 w-100" />
                  <Link
                    className="text-decoration-none text-white"
                    to="/"
                    onClick={logout}
                  >
                    <h4 className="fst-italic">Logout</h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
