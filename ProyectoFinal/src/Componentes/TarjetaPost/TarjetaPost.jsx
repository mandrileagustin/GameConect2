import "./TarjetaPost.css";

export default function TarjetaPost({ comentario, path, nickname, id }) {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center mt-3 mb-3 ">
          <div
            className="card card-post"
            style={{ maxWidth: "40rem" }}
            key={id}
          >
            <img
              src={`http://localhost:3000/${path}`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body text-center">
              <h3 className="text-white fst-italic">{nickname}</h3>
              <h5 className="text-secondary">{comentario}</h5>
              <hr className="border border-primary border-2 opacity-25 w-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
