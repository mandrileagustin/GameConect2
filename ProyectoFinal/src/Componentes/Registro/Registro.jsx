import "./Registro.css";
import { useFormik } from "formik";
import { useState, useRef } from "react";
import { BasicFormSchema } from "./RegistroSchema";

const Juegos = {
  2: "Elden Ring",
  5: "Call of Duty",
  6: "Day Z",
  7: "Valorant",
  8: "LOL",
  9: "Battlefield 1",
};
export default function Registro() {
  const JuegosRef = useRef();
  const [checkValues, setCheckValues] = useState([]);
  const [toogle, setToogle] = useState(false);

  function handleCheck(e) {
    e.preventDefault();
    const values = [
      ...checkValues,
      {
        juego: JuegosRef.current.value || "",
      },
    ];
    setCheckValues(values);
    setToogle(false);
  }

  function addBtn(e) {
    e.preventDefault();
    setToogle(true);
  }

  function handleDelete(e, index) {
    const values = [...checkValues];
    values.splice(index, 1);
    setCheckValues(values);
  }

  function onSubmit(values, actions) {
    const user = {
      ...values,
      juegos: checkValues,
    };

    fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((response) => {
      console.log(values);
      if (response.status === 400) {
        alert("error al recibir el body");
      } else if (response.status === 200) {
        alert(`Usuario registrado correctamente`);
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
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      edad: "",
      genero: "",
      plataforma: "",
      nickname: "",
      idJuego: "",
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
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className=" card-registro">
            <div>
              <h3>Ingresa tus datos</h3>
            </div>
            <div className="">
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
              <div>
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
                  {errors.nickname}
                </div>
              </div>
              <div className="col-12 ">
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
                <div
                  className={
                    errors.genero && touched.genero
                      ? "invalid-feeback is-invalid"
                      : ""
                  }
                  id="input-error"
                >
                  {errors.genero}
                </div>{" "}
              </div>
            </div>
          </div>

          <div>
            <div className="">
              <h2 className="text-white"> Selecciona tu Plataforma</h2>
            </div>

            <div className="col-4">
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

          <div className="">
            <h2 className="text-white">Selecciona tus Juegos</h2>
          </div>
          <ul>
            {checkValues.map((Obj, index) => (
              <div key={index}>
                <h3 className="text-white">{Juegos[Obj.juego]}</h3>
                <button
                  onClick={(e) => handleDelete(e, index)}
                  className="btn btn-outline-primary"
                >
                  Eliminar juego
                </button>
              </div>
            ))}
          </ul>
          {!toogle ? (
            <div>
              <button
                onClick={addBtn}
                type="button"
                className="btn btn-outline-primary"
              >
                Añadir juego
              </button>
            </div>
          ) : (
            <div>
              <select
                className="form-select opacity-75"
                aria-label="Default select example"
                onChange={handleChange}
                onBlur={handleBlur}
                name="idJuego"
                ref={JuegosRef}
              >
                <option value="">Selecciona un juego</option>
                <option value={2}>Elden Ring</option>
                <option value={5}>Call of Duty</option>
                <option value={6}>Day Z</option>
                <option value={7}>LOL</option>
                <option value={8}>Valorant</option>
                <option value={9}>Battlefield 1</option>
              </select>
              <button
                onClick={handleCheck}
                type="button"
                className="btn btn-outline-primary"
              >
                Añadir
              </button>
            </div>
          )}
          <button
            className="btn btn-outline-primary"
            disabled={isSubmitting}
            type="submit"
          >
            Registrate
          </button>
          {/* <pre>{JSON.stringify({ values, errors })}</pre> */}
        </form>
      </div>
    </>
  );
}
