import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

export default function PublicRoute() {
  const { authorization } = useAuthContext();

  if (authorization.email) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
