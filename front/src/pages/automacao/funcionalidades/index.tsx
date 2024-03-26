import React from "react";
import { useState, useEffect } from "react";
import { TreeView, TreeItem } from '@mui/x-tree-view';
import { ExpandMore, ChevronRight, Add, Edit } from '@mui/icons-material';
import type { } from "@mui/x-tree-view/themeAugmentation";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { IconButton, Tooltip, createTheme, ThemeProvider } from "@mui/material";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import globalEnv from '../../../config';

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
                <Edit />
              </IconButton>
            </Tooltip>
          </div>
        )}
        {Object.keys(funcionalidades[key]).length > 0 && key !== 'GVcentrisERP.Tests' && key !== 'GVcentrisPortalAcademico.Tests' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
            <Tooltip title="Adicionar item ao grupo">
              <IconButton onClick={handleButtonClick}>
                <Add />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar grupo de funcionalidades">
              <IconButton onClick={handleButtonClick}>
                <Edit />
              </IconButton>
            </Tooltip>
          </div>
        )}
        {Object.keys(funcionalidades[key]).length > 0 && (key === 'GVcentrisERP.Tests' || key === 'GVcentrisPortalAcademico.Tests') && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
            <Tooltip title="Adicionar item a aplicação">
              <IconButton onClick={handleButtonClick}>
                <Add />
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

export const Funcionalidades = () => {
  const [funcionalidades, setFuncionalidades] = useState<IFuncionalidades>({});
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${globalEnv.API_URL}/api/funcionalidades`);
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
        <h1 className="pr-5" style={{ fontSize: '1.5rem', fontWeight: 'bolder' }}>Automação / Funcionalidades</h1>
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
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          sx={{ height: '80%', flexGrow: 1, maxWidth: '40rem', minWidth: '25rem' }}
        >
          {renderizarFuncionalidades(funcionalidades)}
        </TreeView>
      </ThemeProvider>
    </div>
  );
}
