export default function TarjetaPost({ comentario }) {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div class="card" style={{ width: "18rem" }}>
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-text">{comentario}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
