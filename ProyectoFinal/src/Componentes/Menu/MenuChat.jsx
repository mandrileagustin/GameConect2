import { Link } from "react-router-dom";

export default function MenuChat() {
  return (
    <div className="mt-5 position-absolute top-0 end-0 me-1">
      <button
        className="btn btn-outline-primary py-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i className="bi bi-chat-left-fill"></i>{" "}
      </button>
      <div
        className="offcanvas offcanvas-end bg-dark"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="text-white">Chat</h3>
          <button
            type="button"
            className="btn-close bg-secondary"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <Link to="/chat" className="btn btn-outline-success">
          Chat
        </Link>
      </div>
    </div>
  );
}
