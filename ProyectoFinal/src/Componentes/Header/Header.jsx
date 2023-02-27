import { Link } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
export default function Header() {
  const { authorization } = useAuthContext();
  return (
    <>
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32"></svg>
          <h2 className="text-white">GameConnect</h2>
        </div>

        <ul className="nav nav-pills px-3">
          <li className="nav-item ">
            {!authorization?.email ? (
              <Link
                to="login"
                className="btn btn-outline-primary px-4 me-4"
                aria-current="page"
              >
                Login
              </Link>
            ) : (
              <Link
                to="home"
                className="btn btn-outline-primary px-4 me-4"
                aria-current="page"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </header>
    </>
  );
}
