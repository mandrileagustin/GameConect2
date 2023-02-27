import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import BuscandoJugador from "../BuscandoJugador/BuscandoJugador";
import { BasicFormSchema } from "./SeacrhPlayerSchema";
import "./SearchPlayers.css";
export default function SearchPlayers() {
  const [plataforma, setPlataforma] = useState([]);
  const [user, setUser] = useState([]);
  const { authorization } = useAuthContext();
  const [visible, setVisible] = useState("d-none");

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${authorization.id}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fechData();
  }, []);

  function Spinner() {
    setVisible("");
    setTimeout(() => {
      setVisible("d-none");
    }, 3000);
  }

  async function onSubmit(values, actions) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`http://localhost:3000/juegos/match`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setPlataforma(data);
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
      plataforma: "",
      juego: "",
    },
    validationSchema: BasicFormSchema,
    onSubmit,
  });
  console.log(plataforma);

  return (
    <>
      <div className="container mt-5 contenedor-tamaño">
        <hr className="border border-primary border-1 opacity-50 w-75" />
        <div className="d-flex justify-content-center mb-4">
          <h1 className="text-white">Encuentra tu compañero ideal</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="container d-flex justify-content-center mb-5"
        >
          <div
            className="card text-center card-buscar"
            style={{ width: "30rem" }}
          >
            <div className="card-body text-center d-grid gap-3">
              <h5 className="text-white">Que estas buscando...</h5>
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
                onChange={handleChange}
                onBlur={handleBlur}
                name="juego"
                id="juego"
              >
                <option value="">Juego</option>
                <option value="Call of Duty">Call of Duty</option>
                <option value="Elden ring">Elden ring</option>
                <option value="Day z">Day z</option>
                <option value="LoL">LoL</option>
                <option value="Valorant">Valorant</option>
                <option value="Battlefield 1">Batllefield 1</option>
              </select>
              <hr className="border border-primary border-1 opacity-50 w-100" />
              <div className={`text-center ${visible}`}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                  Spinner();
                  handleSubmit();
                }}
              >
                Buscar jugador
              </button>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-end">
          <hr className="border border-primary border-1 opacity-50 w-75" />
        </div>
        <div className="container d-flex justify-content-center mt-4">
          <div className="">
            {plataforma.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {plataforma.map((jugador) => (
                  <div className="col" key={jugador.id}>
                    <BuscandoJugador
                      plataforma={jugador.plataforma}
                      nickname={jugador.nickname}
                      idSala={jugador.idSala}
                      avatar={jugador.avatar}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h3 className="text-secondary col-6">
                  No hemos encontrado a un jugador con tus filtros, por favor
                  realiza una busqueda...
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
