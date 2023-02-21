export default function CardJuegos({ nombre, imagen }) {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: "24rem" }}>
          <img
            src={`http://localhost:3000/${imagen}`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-text">{nombre}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
