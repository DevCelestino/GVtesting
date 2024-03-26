import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { PlayArrow, Save } from '@mui/icons-material';
import { InscriçãoTabs } from "../../../components";
import globalEnv from '../../../config';

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

export const Inscricao: React.FC = () => {
  const [inscricaoData, setInscricaoData] = useState<IInscricaoData>({
    URL: '',
    FormaDeIngresso: {
      Ativo: true,
      TipoDeDocumento: 'CPF',
      Documento: {
        Valor: '',
        Ativo: true,
        Randomizar: true,
      },
      Nome: {
        Valor: '',
        Ativo: true,
        Randomizar: true,
      },
      EMail: {
        Valor: '',
        Ativo: true,
        Randomizar: true,
      },
      Telefone: {
        Valor: '',
        Ativo: true,
        Randomizar: true,
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${globalEnv.API_URL}/api/ferramentas/inscricao`);
        const jsonData = await response.json();

        return jsonData;
      } catch (error) {
        console.error('Erro ao buscar dados da API /api/ferramentas/inscricao:', error);
      }
    };

    fetchData().then(setInscricaoData);
  }, []);

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInscricaoData((prevState) => ({
      ...prevState,
      URL: event.target.value
    }));
  };

  return (
    <>
      <div className="flex items-center pb-10">
        <h1 className="pr-5" style={{ fontSize: '1.5rem', fontWeight: 'bolder' }}>Ferramentas / Inscrição</h1>
        <div className="flex justify-between gap-3">
          <Button variant="contained" color="warning" style={{ fontWeight: 'bolder' }}><PlayArrow className="mr-1" />Rodar automação</Button>
          <Button variant="contained" color="warning" style={{ fontWeight: 'bolder' }}><Save className="mr-1 !w-5" />Salvar</Button>
        </div>
      </div>
      <TextField
        id="outlined-basic"
        label="URL de inscrição"
        variant="outlined"
        className="!pb-5"
        placeholder='https://gvdasa.com/#/inscricao/cadastro'
        value={inscricaoData.URL}
        onChange={handleURLChange}
        fullWidth />
      <div>
        <InscriçãoTabs tabs={["Forma de Ingresso", "Curso", "Dados Pessoais", "Confirmação", "Pagamento", "Conclusão"]} inscricaoData={inscricaoData} />
      </div>
    </>
  );
}
