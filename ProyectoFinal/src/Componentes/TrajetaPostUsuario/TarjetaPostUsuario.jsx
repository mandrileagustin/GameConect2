export default function TarjetaPostUsuario({ comentario, path, nickname }) {
  return (
    <>
      <div className="d-flex justify-content-center mt-5 px-3 mb-5">
        <div className="card" style={{ width: "36rem" }}>
          <img
            src={`http://localhost:3000/${path}`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h3 className="fst-italic">{nickname}</h3>
            <h5 className="text-secondary">{comentario}</h5>

            <button className="btn btn-outline-primary">Me gusta</button>
          </div>
        </div>
      </div>
    </>
  );
}
