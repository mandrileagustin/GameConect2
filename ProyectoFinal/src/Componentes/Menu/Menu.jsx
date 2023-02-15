import { useAuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function Menu() {
  const { authorization } = useAuthContext();
  const { logout } = useAuthContext();

  return (
    <div className="mt-5 position-absolute top-0 start-0 ms-1">
      <a
        className="btn btn-outline-primary py-3 "
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        <i className="bi bi-list"></i>
      </a>

      <div
        className="offcanvas offcanvas-start bg-dark"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h2 className="offcanvas-title text-white" id="offcanvasExampleLabel">
            GameConnect
          </h2>
          <button
            type="button"
            className="btn-close bg-secondary"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="text-white d-grid gap-4">
            <Link className="text-decoration-none text-white" to="/Home">
              <h3 id="titulo3">Feed</h3>
            </Link>
            <Link
              className="text-decoration-none text-white"
              to={`/perfilUsuario/${authorization.id}`}
            >
              <h3 id="titulo3">Mis Juegos</h3>
            </Link>
            <Link className="text-decoration-none text-white">
              <h3 id="titulo3">Buscar Jugadores</h3>
            </Link>
          </div>
          <div className="dropdown mt-3 position-absolute bottom-0 start-0 mb-4 ms-4">
            <button
              className="btn btn-outline-primary dropdown-toggle btn-lg"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person-circle"></i>
            </button>
            <ul className="dropdown-menu bg-dark py-2">
              <li>
                <Link
                  to={`/perfilUsuario/${authorization.id}`}
                  className="dropdown-item text-white bg-dark"
                >
                  Mi perfil
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="dropdown-item text-white bg-dark"
                  onClick={logout}
                >
                  Logout
                </Link>
              </li>
              <hr className="dropdown-divider bg-secondary" />

              <li>
                <a className="dropdown-item text-white bg-dark" href="#">
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
