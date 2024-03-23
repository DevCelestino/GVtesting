import { Checkbox, FormControlLabel, FormGroup, MenuItem, TextField } from '@mui/material';

const tipoDocumentos = [
  {
    value: 'CPF',
    label: 'CPF',
  },
  {
    value: 'RNE',
    label: 'Registro nacional de estrangeiros',
  },
];

export function FormaDeIngressoForm() {
  return (
    <FormGroup className='flex flex-col justify-between gap-4'>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Ativo" />
      <div className='flex justify-between'>
        <TextField
          id="tipoDocumento"
          label="Tipo de documento"
          select
          variant="outlined"
          defaultValue='CPF'
          style={{ width: '30%' }}
        >
          {tipoDocumentos.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="documento"
          label="Documento"
          variant="outlined"
          placeholder='000.000.000-00'
          defaultValue=''
          style={{ width: '30%' }}
        />
        <TextField
          id="nome"
          label="Nome"
          variant="outlined"
          placeholder='João da Silva'
          defaultValue=''
          style={{ width: '30%' }}
        />
      </div>
      <div className='flex justify-between'>
        <TextField
          id="email"
          label="E-Mail"
          variant="outlined"
          placeholder='exemplo@exemplo.com'
          defaultValue=''
          style={{ width: '30%' }}
        />
        <TextField
          id="telefone"
          label="Telefone"
          variant="outlined"
          placeholder='(51) 99999-9999'
          defaultValue=''
          style={{ width: '30%' }}
        />
        <div style={{ width: '30%' }} />
      </div>
    </FormGroup>
  );
}