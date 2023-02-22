import "./Usuario.css";
export default function Perfil({ usuario }) {
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div
          className="card card-usuario"
          style={{ width: "50rem", height: "9.5rem" }}
          key={usuario.id}
        >
          <div class="row g-0">
            <div class="col-4">
              <img
                src={`http://localhost:3000/${usuario.avatar}`}
                class="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <div className="card-body">
                  <h4 className="text-white">{usuario.nickname}</h4>
                  <h5 className="text-primary">{usuario.plataforma}</h5>

                  <button className="btn btn-outline-primary">
                    Subir foto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
