import { Outlet } from "react-router-dom";
import Menu from "../Menu/Menu";
import MenuChat from "../Menu/MenuChat";

export default function Layout() {
  return (
    <>
      <Outlet />
      <Menu />
      <MenuChat />
    </>
  );
}
