import { Navigate, Route, Routes } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Dashboard, Funcionalidades, Cenarios, Etapas, ObjetosDePagina, Cadastro, Inscricao, Configuracoes } from "./pages";
import { ThemeButton } from "./components";

function App() {
  return (
    <>
      <ThemeButton />
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
          <Route path="/ferramentas/cadastro" element={<Cadastro />} />
          <Route path="/ferramentas/inscricao" element={<Inscricao />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </RootLayout>
    </>
  );
}

export default App;
