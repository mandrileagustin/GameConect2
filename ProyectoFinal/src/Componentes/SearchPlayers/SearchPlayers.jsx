import { useFormik } from "formik";
import { useAuthContext } from "../../Context/AuthContext";
import { BasicFormSchema } from "./SeacrhPlayerSchema";

export default function SearchPlayers() {
  const { authorization } = useAuthContext();
  async function onSubmit(values, actions) {
    fetch(`http://localhost:3000/juegos/match`, {
      method: "GET",
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
  const { handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      plataforma: "",
      juego: "",
    },
    validationSchema: BasicFormSchema,
    onSubmit,
  });
  return (
    <>
      <div className=" d-flex justify-content-center mt-5 d-grid gap-4 align-content-center">
        <form onSubmit={handleSubmit}>
          <div className="card text-center w-50">
            <div className="card-header">Buscar jugadores</div>
            <div className="card-body d-grid gap-2">
              <h5 className="card-title">Que estas buscando...</h5>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleChange}
                onBlur={handleBlur}
                name="plataforma"
                id="plataforma"
              >
                <option value="">Plataforma</option>
                <option value="PlayStation">PlayStation</option>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
              </select>

              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Juego</option>
                <option value="Call of Duty">Call of Duty</option>
                <option value="Elden ring">Elden ring</option>
                <option value="Day z">Day z</option>
                <option value="LoL">LoL</option>
              </select>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Buscar jugador
              </button>
            </div>
            <div className="card-footer text-muted"></div>
          </div>
          <div className="col-3">
            <h1>Encuentra tu compañero ideal</h1>
          </div>
        </form>
      </div>
    </>
  );
}
