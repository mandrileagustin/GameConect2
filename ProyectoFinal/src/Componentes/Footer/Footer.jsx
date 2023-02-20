import "./Footer.css";
export default function Footer() {
  return (
    <>
      <footer className="d-flex flex-wrap justify-content-between align-items-center my-4">
        <h3 className="col-md-4 mb-0 text-muted px-5">GameConnect</h3>

        <ul className="nav col-md-4 justify-content-end px-5">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Comunidad
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Sobre Nosotros
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
