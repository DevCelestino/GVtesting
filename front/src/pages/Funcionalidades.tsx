import { useState, useEffect } from "react";
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { } from "@mui/x-tree-view/themeAugmentation";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { Environment } from '../shared/env/index';


const theme = createTheme({
  components: {
    MuiTreeItem: {
      styleOverrides: {
        label: {
          padding: "10px",
        },
      },
    },
  },
});

interface IFuncionalidades {
  [key: string]: IFuncionalidades | {};
}

function Funcionalidades() {
  const [funcionalidades, setFuncionalidades] = useState<IFuncionalidades>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Environment.API_URL}/api/funcionalidades`);
        const jsonData = await response.json();

        return jsonData;
      } catch (error) {
        console.error('Erro ao buscar dados da API /api/funcionalidades:', error);
      }
    };

    console.log(funcionalidades);
    fetchData().then(setFuncionalidades);
  }, []);

  return (
    <>
      <h1 className="pb-10">Automação / Funcionalidades</h1>
      <div className="pb-10" style={{ maxWidth: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Button variant="contained" color="warning">Nova funcionalidade</Button>
      </div>
      <ThemeProvider theme={theme}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: '80%', flexGrow: 1, maxWidth: '60%', overflowY: 'auto', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {renderizarFuncionalidades(funcionalidades)}
        </TreeView>
      </ThemeProvider>
    </>
  );
}

function renderizarFuncionalidades(funcionalidades: IFuncionalidades): JSX.Element[] {
  return Object.keys(funcionalidades).map((key) => (
    <TreeItem nodeId={key} label={
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
        <span>{key}</span>
        {Object.keys(funcionalidades[key]).length === 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
            <Button variant="contained" color="warning"><EditIcon /></Button>
            <Button variant="contained" color="warning"><MdOutlineFeaturedPlayList style={{ height: "24px", width: '24x' }} /></Button>
          </div>
        )}
        {Object.keys(funcionalidades[key]).length > 0 && (
          <Button variant="contained" color="warning"><AddIcon /></Button>
        )}
      </div>
    }>
      {renderizarFuncionalidades(funcionalidades[key] as IFuncionalidades)}
    </TreeItem>
  ));
}

export default Funcionalidades;
