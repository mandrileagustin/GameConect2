import "./TarjetaUsuarioPost.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function TarjetaPostUsuario({
  comentario,
  path,
  nickname,
  idpost,
}) {
  function deletePost() {
    fetch(`http://localhost:3000/post/${idpost}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    }).then((response) => {
      console.log(response.status);
      if (response.status === 400) {
        alert("error al recibir el body");
      } else if (response.status === 200) {
        Swal.fire({
          position: "center",
          title: "Se ha eliminado la publicacion con exito",
          confirmButtonColor: "rgb(251, 82, 0)",
        });
      }
    });
  }
  return (
    <>
      <div className=" mt-4 mb-2 col-5">
        <div
          className="card card-post-usuario"
          style={{ width: "30rem", height: "34rem" }}
        >
          <img
            src={`http://localhost:3000/${path} `}
            className="card-img-top"
            style={{ height: "20rem" }}
            alt="..."
          />
          <div className="card-body">
            <h3 className="fst-italic text-white">{nickname}</h3>
            <h5 className="text-secondary">{comentario}</h5>
            <hr className="border border-primary border-2 opacity-25 w-100" />
            <div className="d-flex justify-content-end">
              <button
                className="btn  text-secondary text-center"
                onClick={deletePost}
              >
                Borrar publicacion
                <i className="bi bi-x-lg text-danger ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
