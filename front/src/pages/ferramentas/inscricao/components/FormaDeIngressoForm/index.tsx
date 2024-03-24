import { Checkbox, FormControlLabel, FormGroup, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

export function FormaDeIngressoForm() {
  const [tipoDocumento, setTipoDocumento] = useState('CPF');
  const [randomizarDocumento, setRandomizarDocumento] = useState(true);
  const [nome, setNome] = useState('');
  const [randomizarNome, setRandomizarNome] = useState(true);
  const [eMail, setEMail] = useState('');
  const [validEMail, setValidEMail] = useState(true);
  const [randomizarEMail, setRandomizarEMail] = useState(true);
  const [telefone, setTelefone] = useState('');
  const [randomizarTelefone, setRandomizarTelefone] = useState(true);
  const [documento, setDocumento] = useState('');

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

  const handleTipoDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumento('');
    setTipoDocumento(event.target.value);
  };

  const handleRandomizarDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setDocumento('');
    }

    setRandomizarDocumento(event.target.checked);
  };

  const handleDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');

    if (tipoDocumento === 'CPF') {
      let cpf = '';

      for (let i = 0; i < value.length; i++) {
        if (i === 3 || i === 6) {
          cpf += '.';
        } else if (i === 9) {
          cpf += '-';
        }
        cpf += value.charAt(i);
      }

      value = cpf;
    }

    setDocumento(value);
  };

  const handleRandomizarNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setNome('');
    }

    setRandomizarNome(event.target.checked);
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value.replace(/[^\w\sÀ-ÖØ-öø-ÿ]+/g, '').replace(/\d/g, '').trimStart());
  };

  const handleNomeBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setNome(event.target.value.replace(/ {2,}/g, ' ').trimEnd());
  };

  const handleRandomizarEMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setEMail('');
      setValidEMail(true);
    }

    setRandomizarEMail(event.target.checked);
  };

  const handleEMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEMail(event.target.value.replace(/\s/g, '').trimStart());
  };

  const handleEMailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value.trimEnd();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setValidEMail(emailPattern.test(value))
    setEMail(value);
  };

  const handleRandomizarTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTelefone('');
    }

    setRandomizarTelefone(event.target.checked);
  };

  const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(event.target.value.replace(/\s/g, '').trimStart());
  };

  return (
    <FormGroup className='flex flex-col justify-between gap-10'>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
          />
        }
        label="Ativo"
      />
      <div className='flex justify-between'>
        <TextField
          id="tipoDocumento"
          label="Tipo de documento"
          select
          variant="outlined"
          defaultValue={tipoDocumento}
          value={tipoDocumento}
          onChange={handleTipoDocumentoChange}
          style={{
            width: '30%'
          }}
        >
          {tipoDocumentos.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div
          style={{
            width: '30%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <TextField
            disabled={randomizarDocumento}
            value={documento}
            onChange={handleDocumentoChange}
            inputProps={
              tipoDocumento === 'CPF'
                ? { maxLength: 14 }
                : {}
            }
            id="documento"
            label="Documento"
            variant="outlined"
            placeholder={
              tipoDocumento === 'CPF'
                ? '000.000.000-00'
                : ''
            }
            defaultValue=''
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={randomizarDocumento}
                onChange={handleRandomizarDocumentoChange}
              />
            }
            label="Randomizar"
            style={{
              paddingLeft: '10px'
            }}
          />
        </div>
        <div
          style={{
            width: '30%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <TextField
            disabled={randomizarNome}
            value={nome}
            onChange={handleNomeChange}
            onBlur={handleNomeBlur}
            id="nome"
            label="Nome"
            variant="outlined"
            placeholder='João da Silva'
            defaultValue=''
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={randomizarNome}
                onChange={handleRandomizarNomeChange}
              />
            }
            label="Randomizar"
            style={{
              paddingLeft: '10px'
            }}
          />
        </div>
      </div>
      <div className='flex justify-between'>
        <div
          style={{
            width: '30%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <TextField
            disabled={randomizarEMail}
            value={eMail}
            onChange={handleEMailChange}
            onBlur={handleEMailBlur}
            id="email"
            label="E-Mail"
            variant="outlined"
            placeholder='exemplo@exemplo.com'
            defaultValue=''
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={randomizarEMail}
                onChange={handleRandomizarEMailChange}
              />
            }
            label="Randomizar"
            style={{
              paddingLeft: '10px'
            }}
          />
        </div>
        <div
          style={{
            width: '30%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <TextField
            disabled={randomizarTelefone}
            value={telefone}
            onChange={handleTelefoneChange}
            id="telefone"
            label="Telefone"
            variant="outlined"
            placeholder='(11) 99999-9999'
            defaultValue=''
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={randomizarTelefone}
                onChange={handleRandomizarTelefoneChange}
              />
            }
            label="Randomizar"
            style={{
              paddingLeft: '10px'
            }}
          />
        </div>
        <div
          className="dummyDiv"
          style={{
            width: '30%'
          }}
        />
      </div>
    </FormGroup>
  );
}