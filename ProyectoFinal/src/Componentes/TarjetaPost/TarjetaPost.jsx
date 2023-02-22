import "./TarjetaPost.css";

export default function TarjetaPost({ comentario, path, nickname, id }) {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-center mt-3 mb-3 ">
          <div className="card card-post" style={{ width: "34rem" }} key={id}>
            <img
              src={`http://localhost:3000/${path}`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h3 className="text-white fst-italic">{nickname}</h3>
              <h5 className="text-secondary">{comentario}</h5>
              <hr className="border border-primary border-2 opacity-25 w-100" />
              <button className="btn btn-outline-primary">Me gusta</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
