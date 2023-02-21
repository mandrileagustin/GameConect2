export default function TarjetaPost({ comentario, path, nickname }) {
  return (
    <>
      <div className="d-flex justify-content-end justify-content-evenly align-items-center mt-5">
        <div className="card" style={{ width: "40rem" }}>
          <img
            src={`http://localhost:3000/${path}`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h3>{nickname}</h3>
            <h5 className="card-title">{comentario}</h5>

            <button className="btn btn-outline-primary">Me gusta</button>
          </div>
        </div>
      </div>
    </>
  );
}
