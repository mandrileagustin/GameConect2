import { useFormik } from "formik";
import { BasicFormSchema } from "./BuscandoJugadorSchema";
import { useAuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function MenuChat({ idSala }) {
  const { authorization } = useAuthContext();

  async function onSubmit(values, action) {
    fetch(`http://localhost:3000/chat/addRoom/${authorization.id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.status === 400) {
        alert("error al recibir el body");
      } else if (response.status === 200) {
        alert(`Has creado una sala`);
      } else if (response.status === 409) {
        alert("usuario ya registrado");
      }
    });
    action.resetForm();
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
      nombre: "",
    },
    validationSchema: BasicFormSchema,
    onSubmit,
  });
  return (
    <div className="mt-5 position-absolute top-0 end-0 me-1">
      <button
        className="btn btn-outline-primary py-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i className="bi bi-chat-left-fill"></i>{" "}
      </button>
      <div
        className="offcanvas offcanvas-end bg-dark"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="text-white">Chat</h3>
          <button
            type="button"
            className="btn-close bg-primary opacity-25"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="d-flex justify-content-center mt-3 mb-3">
          <form onSubmit={handleSubmit} className="d-grid gap-2">
            <input
              type="text"
              className={
                errors.nombre && touched.nombre
                  ? "form-control is-invalid "
                  : "form-control opacity-75"
              }
              value={values.nombre}
              name="nombre"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nombre"
              id="nombre"
            />
            <div
              className={
                errors.nombre && touched.nombre
                  ? "invalid-feeback is-invalid"
                  : ""
              }
              id="input-error"
            >
              {" "}
              {errors.nombre}
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" to="/chat" type="submit">
                Crear Sala
              </button>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <hr className="border border-primary border-2 opacity-25 w-75" />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Link className="text-decoration-none" to={`/chat/${idSala}`}>
            <h2>Mi sala</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
