import { useFormik } from "formik";
import { BasicFormSchema } from "./BuscandoJugadorSchema";
import { useAuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";

export default function MenuChat({ idSala }) {
  const { authorization } = useAuthContext();
  const [sala, setUserSala] = useState([]);

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/chat`);
        const data = await response.json();
        setUserSala(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fechData();
  }, []);

  const filterUsario = sala.filter((salaId) => salaId.id !== idSala);

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
    <div className="mt-3">
      <button
        className="btn btn-dark py-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i className="bi bi-chat-left-fill text-primary opacity-75"></i>{" "}
      </button>
      <div
        className="offcanvas offcanvas-end barra-chat"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="text-primary">Chat</h3>
          <button
            type="button"
            className="btn-close bg-primary"
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
        <div className="d-flex justify-content-center mt-2">
          <Link
            className="text-decoration-none sala-hover"
            to={`/chat/${idSala}`}
          >
            <h3>Mi sala</h3>
          </Link>
        </div>
        <div className="d-grid gap-3 d-flex justify-content-center flex-column">
          <div className="d-flex justify-content-center">
            <hr className="border border-primary border-2 opacity-25 w-75" />
          </div>
          <h4 className="text-secondary text-center">Salas conectadas</h4>
          {filterUsario?.map((chatUsuarios) => (
            <div className="d-flex justify-content-center mt-3">
              <Link
                className="sala-hover text-decoration-none"
                to={`/chat/${chatUsuarios.id}`}
              >
                <h5>{chatUsuarios.nombre}</h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
