import { Navigate, Route, Routes } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Cenarios from "./pages/Cenarios";
import Etapas from "./pages/Etapas";
import PaginasDeObjetos from "./pages/PaginasDeObjetos";
import Configuracoes from "./pages/Configuracoes";

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/Dashboard" />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Automacao" element={<Navigate to="/Automacao/Cenarios" />} />
        <Route path="/Automacao/Cenarios" element={<Cenarios />} />
        <Route path="/Automacao/Etapas" element={<Etapas />} />
        <Route path="/Automacao/PaginasDeObjetos" element={<PaginasDeObjetos />} />
        <Route path="/Configuracoes" element={<Configuracoes />} />
        <Route path="*" element={<Navigate to="/Dashboard" />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
