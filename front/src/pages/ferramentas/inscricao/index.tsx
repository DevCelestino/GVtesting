import { Button, TextField } from "@mui/material";
import { PlayArrow, Save } from '@mui/icons-material';
import { InscriçãoTabs } from "./Components";

export const Inscricao = () => {
  return (
    <>
      <div className="flex items-center pb-10">
        <h1 className="pr-5">Ferramentas / Inscrição</h1>
        <div className="flex justify-between gap-3">
          <Button variant="contained" color="warning" className="!font-bold"><PlayArrow className="mr-1" />Rodar automação</Button>
          <Button variant="contained" color="warning" className="!font-bold"><Save className="mr-1 !w-5" />Salvar</Button>
        </div>
      </div>
      <TextField
        id="outlined-basic"
        label="URL de inscrição"
        variant="outlined"
        className="!pb-5"
        placeholder='https://gvdasa.com/#/inscricao/cadastro'
        defaultValue=''
        fullWidth />
      <div>
        <InscriçãoTabs tabs={["Forma de Ingresso", "Curso", "Dados Pessoais", "Confirmação", "Pagamento", "Conclusão"]} />
      </div>
    </>
  );
}
