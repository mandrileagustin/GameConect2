import "./Footer.css";
export default function Footer() {
  return (
    <>
      <footer class="d-flex flex-wrap justify-content-between align-items-center my-4">
        <h3 class="col-md-4 mb-0 text-muted px-5">GameConnect</h3>

        <ul class="nav col-md-4 justify-content-end px-5">
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Comunidad
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Sobre Nosotros
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
