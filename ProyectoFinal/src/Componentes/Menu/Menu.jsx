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
          <div className="text-white d-grid gap-2">
            <hr className="border border-danger border-2 opacity-25 w-100" />
            <Link className="text-decoration-none text-white" to="/Home">
              <h3>Feed</h3>
            </Link>
            <hr className="border border-danger border-2 opacity-25 w-100" />
            <Link
              className="text-decoration-none text-white"
              to={`/perfilUsuario/${authorization.id}`}
            >
              <h3>Mis Juegos</h3>
            </Link>
            <hr className="border border-danger border-2 opacity-25 w-100" />
            <Link
              className="text-decoration-none text-white"
              to="/buscarjugador"
            >
              <h3>Buscar Jugadores</h3>
            </Link>
            <hr className="border border-danger border-2 opacity-25 w-100" />
          </div>
          <div className="position-absolute bottom-0 start-0 mb-4 ms-4">
            <Link
              className="text-decoration-none text-white"
              to={`/perfilUsuario/${authorization.id}`}
            >
              <h4>Mi perfil</h4>
            </Link>
            <hr className="border border-danger border-2 opacity-25 w-100" />
            <Link className="text-decoration-none text-white" to="/login">
              <h4>Logout</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
