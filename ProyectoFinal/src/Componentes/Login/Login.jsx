import "./Login.css";
import { useFormik } from "formik";
import { useAuthContext } from "..//../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "./LoginSchema";
import { useEffect } from "react";

export default function Login() {
  const { login, authorization } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorization.email) {
      navigate("/home");
    }
  }, [authorization]);

  async function onSubmit(values, actions) {
    login(values);

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
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit,
  });

  return (
    <section className="posicion-login d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <div className=" d-grid gap-3">
          <h2 className="text-white">Login</h2>
          <hr className="border border-primary border-2 opacity-25 w-100" />
          <input
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
          />
          <div
            className={
              errors.email && touched.email ? "invalid-feeback is-invalid" : ""
            }
            id="input-error"
          >
            {errors.email}
          </div>
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
          <div>
            <hr className="border border-primary border-2 opacity-25 w-100" />
            <button
              disabled={isSubmitting}
              type="submit"
              value="Login"
              className="boton-login col-6"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <div className="d-flex px-4" style={{ height: "600px" }}>
        <div className="border border-white border-2 opacity-25"></div>
      </div>
      <div className="d-flex flex-column align-items-start d-grid gap-2">
        <h2 className="text-white col-10 fst-italic">
          Si no tienes una cuenta...
        </h2>
        <h2 className="text-white text-end col-10 fst-italic">
          Registrate para continuar
        </h2>
        <div className="d-flex justify-content-end col-12">
          <Link className="sala-hover text-decoration-none " to={"/registro"}>
            Ir a registro
          </Link>
        </div>
      </div>
    </section>
  );
}
