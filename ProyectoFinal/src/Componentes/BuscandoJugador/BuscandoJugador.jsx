export default function BuscandoJugador({ plataforma, juego, nickname }) {
  return (
    <>
      <div className="d-flex justify-content-center mt-5 d-grid gap-4">
        <div
          className="card text-center d-grid gap-3"
          style={{ width: "18rem" }}
        >
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Nuestro Usuario</h5>
            <p className="card-text">NickName</p>
          </div>
        </div>

        <div>
          <h2>Buscando...</h2>
        </div>

        <div className="card text-center " style={{ width: "18rem" }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body d-grid gap-3">
            <h5 className="card-title">Usuario con el que conectamos</h5>
            <p className="card-text">{nickname}</p>

            <p className="card-text">{plataforma}</p>
            <p className="card-text">{juego}</p>
            <button className="btn btn-primary">Conectar</button>
            <button className="btn btn-danger">Seguir buscando</button>
          </div>
        </div>
      </div>
    </>
  );
}
