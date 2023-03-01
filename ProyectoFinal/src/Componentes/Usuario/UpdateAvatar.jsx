import { useFormik } from "formik";
import { useAuthContext } from "../../Context/AuthContext";
import { Tupm } from "./Tupm";
import "./Usuario.css";

import Swal from "sweetalert2";

export default function Avatar() {
  const { authorization } = useAuthContext();

  function onSubmit(values, actions) {
    let formData = new FormData();
    formData.append("imagen", values.avatar);

    fetch(`http://localhost:3000/user/imagen/${authorization.id}`, {
      method: "POST",

      body: formData,
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
    setFieldValue,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      avatar: "",
    },
    validationSchema: Tupm,
    onSubmit,
  });
  return (
    <>
      <div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="d-grid gap-2">
            <h4 className="text-white">Subir foto de perfil </h4>
            <input
              className={
                errors.plataforma && touched.plataforma
                  ? "form-control is-invalid"
                  : "form-control opacity-75"
              }
              onChange={(e) => setFieldValue("avatar", e.target.files[0])}
              onBlur={handleBlur}
              name="avatar"
              id="avatar"
              value={undefined}
              type="file"
            />
            <button
              className="btn btn-primary"
              disabled={isSubmitting}
              type="submit"
            >
              <i className="bi bi-check-lg"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
