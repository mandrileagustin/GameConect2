export default function Perfil({ usuario }) {
  return (
    <>
      <div>
        <div className="d-flex justify-content-center justify-content-evenly align-items-center mt-5">
          <div className="card" style={{ width: "40rem" }} key={usuario.id}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h4 className="card-title">{usuario.nickname}</h4>
              <h5 className="text-card">{usuario.plataforma}</h5>

              <button className="btn btn-outline-primary">
                Editar usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
