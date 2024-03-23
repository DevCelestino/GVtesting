import { Navigate, Route, Routes } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Funcionalidades from "./pages/automacao/funcionalidades";
import Cenarios from "./pages/Cenarios";
import Etapas from "./pages/Etapas";
import ObjetosDePagina from "./pages/ObjetosDePagina";
import Ferramentas from "./pages/ferramentas/cadastro";
import Inscricao from "./pages/ferramentas/inscricao";
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
        <Route path="/ferramentas" element={<Navigate to="/ferramentas/cadastro" />} />
        <Route path="/ferramentas/cadastro" element={<Ferramentas />} />
        <Route path="/ferramentas/inscricao" element={<Inscricao />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
