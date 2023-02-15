import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import Layout from "./Componentes/Layout/Layout";
import HomePage from "./Views/Bienvenida/Bienvenida";
import InicioSecion from "./Views/InicioSecion/InicioSecion";
import VistaRegistro from "./Views/VistaRegistro/VistaRegistro";
import PerfilUsuario from "./Views/PerfilUsuario/PerfilUsuario";

import Home from "./Views/Home/Home";
import SearchPlayersVista from "./Views/SearchPlayersVista/SearchPlayersVista";
import io from "socket.io-client";
import BuscandoJugadorVista from "./Views/BuscandoJugadorVista/BuscandoJugadorVista";
const socket = io.connect("http://localhost:3001");
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="perfilUsuario/:id" element={<PerfilUsuario />} />
              <Route path="/buscarjugador" element={<SearchPlayersVista />} />
              <Route
                path="/buscandojugador"
                element={<BuscandoJugadorVista />}
              />
            </Route>

            <Route index element={<HomePage />} />
            <Route path="/login" element={<InicioSecion />} />
            <Route path="/registro" element={<VistaRegistro />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
