import "./TarjetaUsuarioPost.css";
export default function TarjetaPostUsuario({ comentario, path, nickname }) {
  function deletePost() {}
  return (
    <>
      <div className=" mt-2 mb-2 col-5">
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
            <div className="d-flex justify-content-end">
              <button className="btn  text-secondary text-center">
                Borrar publicacion
                <i class="bi bi-x-lg text-danger ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
