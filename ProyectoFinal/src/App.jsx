import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import Layout from "./Componentes/Layout";

import HomePage from "./Views/Bienvenida/Bienvenida";
import InicioSecion from "./Views/InicioSecion/InicioSecion";
import VistaRegistro from "./Views/VistaRegistro/VistaRegistro";
import PerfilUsuario from "./Views/PerfilUsuario/PerfilUsuario";
import Home from "./Views/Home/Home";
import SearchPlayersVista from "./Views/SearchPlayersVista/SearchPlayersVista";
import ChatVista from "./Views/ChatVista/ChatVista";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<InicioSecion />} />
              <Route path="registro" element={<VistaRegistro />} />
              <Route path="buscarjugador" element={<SearchPlayersVista />} />
              <Route path="chat/:id" element={<ChatVista />} />
              <Route path="home" element={<Home />} />
              <Route path="perfilUsuario/:id" element={<PerfilUsuario />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
