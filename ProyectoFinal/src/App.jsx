import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import Layout from "./Componentes/Layout/Layout";
import HomePage from "./Views/Home/Home";
import InicioSecion from "./Views/InicioSecion/InicioSecion";
import VistaRegistro from "./Views/VistaRegistro/VistaRegistro";
import PerfilUsuario from "./Views/PerfilUsuario/PerfilUsuario";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<InicioSecion />} />
              <Route path="/registro" element={<VistaRegistro />} />
              <Route path="/perfilUsuario" element={<PerfilUsuario />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
