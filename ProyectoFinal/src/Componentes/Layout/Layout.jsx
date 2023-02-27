import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import Menu from "../Menu/Menu";
import MenuChat from "../Menu/MenuChat";

export default function Layout() {
  const [sala, setUserSala] = useState([]);
  const { authorization } = useAuthContext();

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/chat/${authorization.id}`
        );
        const data = await response.json();
        setUserSala(data[0]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fechData();
  }, []);

  return (
    <>
      <Outlet />
      <div className="fixed-top mt-5 d-flex ">
        <Menu />
        <MenuChat idSala={sala.idSala} nombre={sala.nombre} />
      </div>
    </>
  );
}
