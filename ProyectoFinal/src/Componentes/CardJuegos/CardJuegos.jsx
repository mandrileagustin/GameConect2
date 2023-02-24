import "./CardJuegos.css";
export default function CardJuegos({ nombre, imagen }) {
  return (
    <div>
      <div>
        <div className="card card-juegos-usuario" style={{ width: "24rem" }}>
          <img
            src={`http://localhost:3000/${imagen}`}
            className="card-img-top"
            style={{ height: "12rem" }}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-text text-white">{nombre}</h5>
            <hr className="border border-primary border-2 opacity-25 w-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
