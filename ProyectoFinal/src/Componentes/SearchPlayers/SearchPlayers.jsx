import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import BuscandoJugador from "../BuscandoJugador/BuscandoJugador";
import { BasicFormSchema } from "./SeacrhPlayerSchema";

export default function SearchPlayers() {
  const [plataforma, setPlataforma] = useState([]);
  const [user, setUser] = useState([]);
  const { authorization } = useAuthContext();

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

  async function onSubmit(values, actions) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
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

  const filteredArray =
    plataforma.length > 0 &&
    plataforma.filter((value) => value.idUser !== authorization.id);

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

              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Buscar jugador
              </button>
            </div>
          </div>
          <div className="col-3">
            <h1>Encuentra tu compañero ideal</h1>
          </div>
        </form>
        {plataforma.length > 0 ? (
          <BuscandoJugador
            plataforma={filteredArray[0].plataforma}
            juego={filteredArray[0].juego}
            nickname={filteredArray[0].nickname}
            idSala={filteredArray[0].idSala}
          />
        ) : (
          <h3>No hemos encontrado a un jugador con tus filtros</h3>
        )}
      </div>
    </>
  );
}
