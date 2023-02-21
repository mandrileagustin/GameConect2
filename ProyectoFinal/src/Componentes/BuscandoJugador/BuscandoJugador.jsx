import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { BasicFormSchema } from "./BuscandoJugadorSchema";

export default function BuscandoJugador({ plataforma, juego, nickname }) {
  async function onSubmit(values, action) {
    fetch("http://localhost:3000/chat/addRoom", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.status === 400) {
        alert("error al recibir el body");
      } else if (response.status === 200) {
        alert(`usuario ${values.nombre} registrado correctamente`);
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
    <>
      <div className="d-flex justify-content-center mt-5 d-grid gap-4">
        <div
          className="card text-center d-grid gap-3"
          style={{ width: "18rem" }}
        >
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Nuestro Usuario</h5>
            <p className="card-text">NickName</p>
          </div>
        </div>

        <h2>Buscando...</h2>

        <div className="card text-center " style={{ width: "18rem" }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body d-grid gap-3">
            <h5 className="card-title">Usuario con el que conectamos</h5>
            <p className="card-text">{nickname}</p>

            <p className="card-text">{plataforma}</p>
            <p className="card-text">{juego}</p>

            <button className="btn btn-danger">Seguir buscando</button>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={
                errors.nombre && touched.nombre
                  ? "form-control is-invalid"
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
            <button className="btn btn-primary" to="/chat" type="submit">
              Crear Sala
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
