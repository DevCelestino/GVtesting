import { Button, TextField } from "@mui/material";
import { InscriçãoTabs } from "./components";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Inscricao() {
  return (
    <>
      <div className="flex items-center pb-10">
        <h1 className="pr-5">Ferramentas / Inscrição</h1>
        <Button variant="contained" color="warning"><PlayArrowIcon className="mr-1"/>Rodar automação</Button>
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

export default Inscricao;
