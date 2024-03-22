import { Navigate, Route, Routes } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Funcionalidades from "./pages/Funcionalidades";
import Cenarios from "./pages/Cenarios";
import Etapas from "./pages/Etapas";
import ObjetosDePagina from "./pages/ObjetosDePagina";
import Configuracoes from "./pages/Configuracoes";

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/automacao" element={<Navigate to="/automacao/funcionalidades" />} />
        <Route path="/automacao/funcionalidades" element={<Funcionalidades />} />
        <Route path="/automacao/cenarios" element={<Cenarios />} />
        <Route path="/automacao/etapas" element={<Etapas />} />
        <Route path="/automacao/objetosdepagina" element={<ObjetosDePagina />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
