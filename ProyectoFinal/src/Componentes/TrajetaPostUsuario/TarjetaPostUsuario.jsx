import "./TarjetaUsuarioPost.css";
export default function TarjetaPostUsuario({ comentario, path, nickname }) {
  return (
    <>
      <div className=" mt-5 mb-5 col-5">
        <div className="card card-post-usuario" style={{ width: "30rem" }}>
          <img
            src={`http://localhost:3000/${path} `}
            className="card-img-top"
            style={{ height: "18rem" }}
            alt="..."
          />
          <div className="card-body">
            <h3 className="fst-italic text-white">{nickname}</h3>
            <h5 className="text-secondary">{comentario}</h5>
            <hr className="border border-primary border-2 opacity-25 w-100" />
          </div>
        </div>
      </div>
    </>
  );
}
