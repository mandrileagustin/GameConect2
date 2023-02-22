import { useFormik } from "formik";
import { BasicFormSchema } from "./PublicarSchema";
import { useAuthContext } from "../../Context/AuthContext";
import "./CardPublicar.css";

export default function Comentario() {
  const { authorization } = useAuthContext();
  async function onSubmit(values, actions) {
    fetch(`http://localhost:3000/post/addPost/${authorization.id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => {
      console.log(values);
      if (response.status === 400) {
        alert("error al recibir el body");
      } else if (response.status === 200) {
        alert(`usuario ${values.comentario} registrado correctamente`);
      } else if (response.status === 409) {
        alert("usuario ya registrado");
      }
    });
    console.log(values);

    await new Promise((resolve) => setTimeout(resolve, 2000));
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
      comentario: "",
    },
    validationSchema: BasicFormSchema,
    onSubmit,
  });
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <form onSubmit={handleSubmit}>
          <div className="card card-comentar" style={{ width: "40rem" }}>
            <div className="card-header text-white">Publicar</div>
            <div className="card-body  d-grid gap-4">
              <textarea
                type="text"
                className={
                  errors.comentario && touched.nombre
                    ? "form-control is-invalid"
                    : "form-control opacity-75"
                }
                value={values.comentario}
                name="comentario"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Comentario"
                id="comentario"
              />
              <button
                disabled={isSubmitting}
                className="btn btn-outline-primary"
                type="submit"
              >
                {" "}
                Comentar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
