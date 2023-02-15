import Menu from "../../Componentes/Menu/Menu";
import MenuChat from "../../Componentes/Menu/MenuChat";
export default function Perfil({ usuario }) {
  return (
    <>
      <div>
        <Menu />
        <div className="d-flex justify-content-center justify-content-evenly align-items-center mt-5">
          <div className="card" style={{ width: "40rem" }} key={usuario.id}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h4 className="card-title">{usuario.nickname}</h4>
              <h5 className="text-card">{usuario.plataforma}</h5>

              <button className="btn btn-outline-primary">
                Editar usuario
              </button>
            </div>
          </div>
          <div>
            <div className="card" style={{ width: "18rem;" }}>
              <img src="..." class="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Comentario del usuario</h5>

                <button class="btn btn-primary">Me gusta</button>
              </div>
            </div>
          </div>
        </div>
        <MenuChat />
      </div>
    </>
  );
}
