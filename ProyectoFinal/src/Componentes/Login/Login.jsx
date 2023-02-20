import "./Login.css";
import { useFormik } from "formik";
import { useAuthContext } from "..//../Context/AuthContext";
import { Link } from "react-router-dom";
import { LoginSchema } from "./LoginSchema";

export default function Login() {
  const { login } = useAuthContext();

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
    <section className="posicion-login d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <div className="card-login d-grid gap-4">
          <h2 className="text-white">Login</h2>
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
            <button
              disabled={isSubmitting}
              type="submit"
              value="Login"
              className="btn btn-outline-primary col-6"
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
          <Link className="btn btn-outline-primary col-4" to={"/registro"}>
            Ir a registro
          </Link>
        </div>
      </div>
    </section>
  );
}
