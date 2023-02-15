import "./Login.css";
import { useFormik } from "formik";
import { useAuthContext } from "..//../Context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "./LoginSchema";

export default function Login() {
  const { authorization, login } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorization) {
      navigate(`/perfilUsuario/${authorization.id}`);
    }
  }, [authorization]);

  async function onSubmit(values, actions) {
    login(values);
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
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit,
  });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center justify-content-evenly align-items-center mt-5">
          <div className="card-login">
            <div className="py-2">
              <h3 className="text-white">Login</h3>
            </div>
            <div className="card-body border-rounded d-grid gap-3">
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
                  errors.email && touched.email
                    ? "invalid-feeback is-invalid"
                    : ""
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
            </div>
            <div className="py-2 px-3 ">
              <button
                disabled={isSubmitting}
                type="submit"
                value="Login"
                className="btn btn-outline-primary col-5 "
                id="boton-login"
              >
                Login
              </button>
            </div>
          </div>

          <div>
            <h2>Si no tienes una cuenta, registrate para continuar</h2>
            <Link className="btn btn-outline-primary" to={"/registro"}>
              Ir a registro
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
