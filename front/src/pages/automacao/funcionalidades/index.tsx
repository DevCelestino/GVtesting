import { useState, useEffect } from "react";
import { TreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { } from "@mui/x-tree-view/themeAugmentation";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { Environment } from '../../../shared/env/index';
import { IconButton, Tooltip } from "@mui/material";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegMinusSquare } from "react-icons/fa";
import React from "react";

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

let count = 1;

function renderizarFuncionalidades(funcionalidades: IFuncionalidades): JSX.Element[] {
  count++;

  return Object.keys(funcionalidades).map((key) => (
    <TreeItem nodeId={count.toString()} label={
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>{(key === 'GVcentrisERP.Tests') ? 'GVcentris' : ((key === 'GVcentrisPortalAcademico.Tests') ? 'Portal acadêmico' : key)}</span>
        {Object.keys(funcionalidades[key]).length === 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
            <Tooltip title="Editar cenários da funcionalidade">
              <IconButton onClick={handleButtonClick}>
                <MdOutlineFeaturedPlayList />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar funcionalidade">
              <IconButton onClick={handleButtonClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
        {Object.keys(funcionalidades[key]).length > 0 && key !== 'GVcentrisERP.Tests' && key !== 'GVcentrisPortalAcademico.Tests' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
            <Tooltip title="Adicionar item ao grupo">
              <IconButton onClick={handleButtonClick}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar grupo de funcionalidades">
              <IconButton onClick={handleButtonClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
        {Object.keys(funcionalidades[key]).length > 0 && (key === 'GVcentrisERP.Tests' || key === 'GVcentrisPortalAcademico.Tests') && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
            <Tooltip title="Adicionar item a aplicação">
              <IconButton onClick={handleButtonClick}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    }>
      {renderizarFuncionalidades(funcionalidades[key] as IFuncionalidades)}
    </TreeItem>
  ));
}

function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
  event.stopPropagation();
}

function Funcionalidades() {
  const [funcionalidades, setFuncionalidades] = useState<IFuncionalidades>({});
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

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

    fetchData().then(setFuncionalidades);
  }, []);

  return (
    <div>
      <div className="flex items-center pb-10">
        <h1 className="pr-5">Automação / Funcionalidades</h1>
        <div className="flex justify-between gap-2">
        <Tooltip title="Expandir todos">
          <IconButton style={{ color: '#000' }}>
            <FaRegPlusSquare />
          </IconButton>
        </Tooltip>
        <Tooltip title="Minimizar todos">
          <IconButton style={{ color: '#000' }}>
            <FaRegMinusSquare />
          </IconButton>
        </Tooltip>
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: '80%', flexGrow: 1, maxWidth: '40rem', minWidth: '25rem' }}
        >
          {renderizarFuncionalidades(funcionalidades)}
        </TreeView>
      </ThemeProvider>
    </div>
  );
}

export default Funcionalidades;
