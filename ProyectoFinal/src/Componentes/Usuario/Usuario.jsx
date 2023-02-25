import { useFormik } from "formik";
import { useAuthContext } from "../../Context/AuthContext";
import { UsuarioSchema } from "./UsuarioSchema";
import "./Usuario.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Perfil({ usuario }) {
  const { authorization } = useAuthContext();
  const params = useParams();

  function onSubmit(values, actions) {
    fetch(`http://localhost:3000/user/${authorization.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values, authorization),
    }).then((response) => {
      console.log(values);
      if (response.status === 400) {
        alert("error al recibir el body");
      } else if (response.status === 200) {
        Swal.fire({
          position: "center",
          title: "Tu perfil se a modificado correctamente",
          confirmButtonColor: "#00074a",
        });
      } else if (response.status === 409) {
        alert("usuario ya registrado");
      }
    });
    console.log(values);

    actions.resetForm();
  }

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      nickname: "",
      plataforma: "",
    },
    validationSchema: UsuarioSchema,
    onSubmit,
  });
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className=" mt-5 mb-5 col-5">
          <div className="card card-post-usuario" style={{ width: "30rem" }}>
            <img
              src={`http://localhost:3000/${usuario.avatar} `}
              className="card-img-top"
              style={{ height: "18rem" }}
              alt="..."
            />
            <div className="card-body">
              <h3 className="fst-italic text-white">{usuario.nickname}</h3>
              <h4 className="text-secondary">{usuario.plataforma}</h4>

              <hr className="border border-primary border-2 opacity-25 w-100" />
            </div>
          </div>
        </div>
        <div>
          <div className="card-update">
            <div className="card card-post-usuario" style={{ width: "22rem" }}>
              <div className="card-body text-center card-update-color">
                <form onSubmit={handleSubmit} className="d-grid gap-2">
                  <h3 className="text-white">Editar usuario</h3>
                  <input
                    className={
                      errors.nickname && touched.nickname
                        ? "form-control is-invalid"
                        : "form-control opacity-75"
                    }
                    aria-describedby="inputGroup-sizing-sm"
                    value={values.nickname}
                    name="nickname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nickname"
                    type="text"
                  />
                  <div
                    className={
                      errors.nickname && touched.nickname
                        ? "invalid-feeback is-invalid"
                        : ""
                    }
                    id="input-error"
                  >
                    {errors.nickname}
                  </div>
                  <input
                    className={
                      errors.plataforma && touched.plataforma
                        ? "form-control is-invalid"
                        : "form-control opacity-75"
                    }
                    aria-describedby="inputGroup-sizing-sm"
                    value={values.plataforma}
                    name="plataforma"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Plataforma"
                    type="text"
                  />
                  <div
                    className={
                      errors.plataforma && touched.plataforma
                        ? "invalid-feeback is-invalid"
                        : ""
                    }
                    id="input-error"
                  >
                    {errors.plataforma}
                  </div>
                  <button
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    <i className="bi bi-check-lg"></i>
                  </button>
                </form>
                <hr className="border border-primary border-2 opacity-25 w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
