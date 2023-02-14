import "./Registro.css";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BasicFormSchema } from "./RegistroSchema";
import { useAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const { authorization } = useAuthContext();
  const navigate = useNavigate();
  const [juegos, setJuego] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/juegos`);
        const data = await response.json();
        setJuego(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  async function onSubmit(values, actions) {
    fetch("http://localhost:3000/user", {
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
        alert(`usuario ${values.nombre} registrado correctamente`);
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
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      edad: "",
      genero: "",
      plataforma: "",
      generoJuego: "",
      nickname: "",
    },
    validationSchema: BasicFormSchema,
    onSubmit,
  });
  //   useEffect(() => {
  //     if (authorization) {
  //       navigate("/perfilUsuario");
  //     }
  //   }, [authorization]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="card-body mb-3 w-75">
            <div className=" py-2">
              <h3 id="titulo3">Ingresa tus datos</h3>
            </div>
            <div className=" d-grid gap-2 border-rounded-6 ">
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
              <input
                type="text"
                className={
                  errors.apellido && touched.apellido
                    ? "form-control is-invalid"
                    : "form-control opacity-75"
                }
                value={values.apellido}
                name="apellido"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Apellidos"
                id="apellido"
              />
              <div
                className={
                  errors.apellido && touched.apellido
                    ? "invalid-feeback is-invalid"
                    : ""
                }
                id="input-error"
              >
                {errors.apellido}
              </div>{" "}
              <input
                type="email"
                className={
                  errors.email && touched.email
                    ? "form-control is-invalid"
                    : "form-control opacity-75"
                }
                aria-describedby="emailHelp"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                id="email"
              />
              <div
                className={
                  errors.email && touched.email
                    ? "invalid-feeback is-invalid"
                    : ""
                }
                id="input-error"
              >
                {errors.email}
              </div>{" "}
              <input
                type="password"
                className={
                  errors.password && touched.password
                    ? "form-control is-invalid"
                    : "form-control opacity-75"
                }
                value={values.password}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                id="password"
              />
              <div
                className={
                  errors.password && touched.password
                    ? "invalid-feeback is-invalid"
                    : ""
                }
                id="input-error"
              >
                {errors.password}
              </div>{" "}
              <input
                type="text"
                className={
                  errors.edad && touched.edad
                    ? "form-control is-invalid"
                    : "form-control opacity-75"
                }
                value={values.edad}
                name="edad"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Edad"
                id="edad"
              />
              <div
                className={
                  errors.edad && touched.edad
                    ? "invalid-feeback is-invalid"
                    : ""
                }
                id="input-error"
              >
                {errors.edad}
              </div>{" "}
            </div>
            <div className="col-12 mt-2">
              <select
                className="form-select opacity-75"
                aria-label="Default select example"
                onChange={handleChange}
                onBlur={handleBlur}
                name="genero"
                id="genero"
              >
                <option value="">Tu genero</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Prefiero no especificar">
                  Prefiero no especificar
                </option>
              </select>
            </div>
            <input
              type="text"
              className={
                errors.nickname && touched.nickname
                  ? "form-control is-invalid"
                  : "form-control opacity-75"
              }
              value={values.nickname}
              name="nickname"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nickname"
              id="nickname"
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
          </div>
        </div>

        <div>
          <div className="mt-5 mb-4" id="plataforma-posicion">
            <h2 id="titulo2"> Selecciona tu Plataforma</h2>
          </div>

          <div className="col-6 ms-5">
            <select
              className="form-select opacity-75"
              aria-label="Default select example"
              onChange={handleChange}
              onBlur={handleBlur}
              name="plataforma"
              id="plataforma"
            >
              <option value="">Plataforma</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Xbox">Xbox</option>
              <option value="PC">PC</option>
            </select>
          </div>
        </div>
        <div>
          <div className="mt-5 mb-4" id="genero-posicion">
            <h2 id="titulo2"> Selecciona un genero de juego</h2>
          </div>

          <div className="col-6 ms-5">
            <select
              className="form-select opacity-75"
              aria-label="Default select example"
              onChange={handleChange}
              onBlur={handleBlur}
              name="generoJuego"
              id="generoJuego"
            >
              <option value="">Genero</option>
              <option value="Rol">Rol</option>
              <option value="Shooter">Shooter</option>
              <option value="Supervivencia">Supervivencia</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <h2 id="titulo2">Selecciona tus Juegos</h2>
          </div>
        </div>
        <div className="d-flex flex-wrap d-grid gap-2 col-8">
          {juegos.map((juego, index) => (
            <div key={index}>
              <div className="py-3 mt-4 mb-4 ">
                <div
                  className="card "
                  id="card-juegos"
                  style={{ width: "24rem" }}
                >
                  <img
                    src="src/assets/Imagenes/warzone.jpg"
                    className="card-img-top"
                    alt=".."
                  />
                  <div className="card-body">
                    <h3 className="card-text" id="titulo3">
                      {juego.nombre}
                    </h3>
                    <h6 className="text-white">{juego.plataforma}</h6>
                    <h6 className="text-white">{juego.genero}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-outline-primary"
          disabled={isSubmitting}
          type="submit"
        >
          Registrate
        </button>
        <pre>{JSON.stringify({ values, errors })}</pre>
      </form>
    </>
  );
}
