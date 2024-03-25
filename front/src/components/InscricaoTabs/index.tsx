import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import { FormaDeIngressoForm } from '../FormaDeIngressoForm';

interface IProps {
  tabs: string[],
  inscricaoData: IInscricaoData
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IInscricaoData {
  URL: string;
  FormaDeIngresso: {
    Ativo: boolean;
    TipoDeDocumento: string;
    Documento: {
      Valor: string;
      Ativo: boolean;
      Randomizar: boolean;
    };
    Nome: {
      Valor: string;
      Ativo: boolean;
      Randomizar: boolean;
    };
    EMail: {
      Valor: string;
      Ativo: boolean;
      Randomizar: boolean;
    };
    Telefone: {
      Valor: string;
      Ativo: boolean;
      Randomizar: boolean;
    };
  };
}

export const InscriçãoTabs: React.FC<IProps> = ({
  tabs,
  inscricaoData
}) => {
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel value={value} index={index}>
          {tab === 'Forma de Ingresso' && (<FormaDeIngressoForm inscricaoData={inscricaoData} />)}
        </CustomTabPanel>
      ))}
    </>
  );
}
