import { useFormik } from "formik";
import { BasicFormSchema } from "./PublicarSchema";
import { useAuthContext } from "../../Context/AuthContext";
import "./CardPublicar.css";
import Swal from "sweetalert2";
export default function Comentario() {
  const { authorization } = useAuthContext();
  async function onSubmit(values, actions) {
    let formData = new FormData();
    formData.append("imagen", values.path);
    formData.append("comentario", values.comentario);
    fetch(`http://localhost:3000/post/addPost/${authorization.id}`, {
      method: "POST",

      body: formData,
    }).then((response) => {
      console.log(values);
      if (response.status === 400) {
        alert("error al recibir el body");
      } else if (response.status === 200) {
        Swal.fire({
          position: "center",
          title: "Publicacion realizada exito",
          confirmButtonColor: "#00074a",
        });
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
    setFieldValue,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      comentario: "",
      path: "",
    },
    validationSchema: BasicFormSchema,
    onSubmit,
  });
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <form
          onSubmit={handleSubmit}
          className="w-100 mx-3 mx-md-auto"
          style={{ maxWidth: "40rem" }}
        >
          <div className="card card-comentar">
            <div className="card-header text-white">Publicar</div>
            <div className="card-body d-grid gap-4">
              <input
                className=""
                onChange={(e) => setFieldValue("path", e.target.files[0])}
                onBlur={handleBlur}
                name="path"
                id="path"
                value={undefined}
                type="file"
              />
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
              <hr className="border border-primary border-2 opacity-25 w-100" />
              <button
                disabled={isSubmitting}
                className="btn btn-primary"
                type="submit"
              >
                Comentar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
