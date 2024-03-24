import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Dashboard, Funcionalidades, Cenarios, Etapas, ObjetosDePagina, Cadastro, Inscricao, Configuracoes } from "./pages";
import { Button } from "@mui/material";
import { Brightness4, Brightness7 } from '@mui/icons-material';

function App() {
  const [darkMode, setDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <Button
        className="!absolute bottom-5 right-5 ToggleTheme"
        style={{
          minWidth: '50px',
          minHeight: '50px'
        }}
        onClick={toggleDarkMode}
        startIcon={
          darkMode
            ? <Brightness7 />
            : <Brightness4 />
        }
      />
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
