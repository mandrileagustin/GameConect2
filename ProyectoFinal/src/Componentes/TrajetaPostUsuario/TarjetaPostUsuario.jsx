import "./TarjetaUsuarioPost.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
export default function TarjetaPostUsuario({
  comentario,
  path,
  nickname,
  idpost,
  setPostUsuarios,
}) {
  const { authorization } = useAuthContext();
  async function deletePost() {
    const response = await fetch(
      `http://localhost:3000/post/${idpost}/${authorization.id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (response.status === 400) {
      alert("error al recibir el body");
    } else if (response.status === 200) {
      const posts = await response.json();
      setPostUsuarios(posts);

      Swal.fire({
        position: "center",
        title: "Publicacion eliminada con exito",
        confirmButtonColor: "#00074a",
      });
    } else if (response.status === 409) {
      alert("");
    }
  }
  return (
    <>
      <div className="mt-4 mb-2 col-5">
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
              <button className="boton-inicio text-center" onClick={deletePost}>
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
