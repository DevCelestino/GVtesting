import { Checkbox, FormControlLabel, FormGroup, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

interface IProps {
  inscricaoData: IInscricaoData;
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

const FormatarCPF = (value: string) => {
  let cleanedValue = value.replaceAll('.', '').replaceAll('-', '');

  let cpf = '';

  for (let i = 0; i < cleanedValue.length; i++) {
    if (i === 3 || i === 6) {
      cpf += '.';
    } else if (i === 9) {
      cpf += '-';
    }
    cpf += cleanedValue.charAt(i);
  }

  return cpf;
}

const FormatarTelefone = (value: string) => {
  let cleanedValue = value.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '');

  let telefone = '';

  if (cleanedValue.length === 10) {
    telefone = cleanedValue.replace(/(\d{2})(\d{0,4})(\d{0,4})/, '($1) $2-$3');
  } else if (cleanedValue.length === 11) {
    telefone = cleanedValue.replace(/(\d{2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
  } else {
    for (let i = 0; i < cleanedValue.length; i++) {
      if (i === 0) {
        telefone += '(';
      }
      if (i === 2) {
        telefone += ') ';
      }
      if (i === 6) {
        telefone += '-';
      }
      telefone += cleanedValue.charAt(i);
    }
  }

  return telefone;
}

export const FormaDeIngressoForm: React.FC<IProps> = ({ inscricaoData }) => {
  const [tipoDocumento, setTipoDocumento] = useState(inscricaoData.FormaDeIngresso.TipoDeDocumento);
  const [documento, setDocumento] = useState(FormatarCPF(inscricaoData.FormaDeIngresso.Documento.Valor));
  const [randomizarDocumento, setRandomizarDocumento] = useState(inscricaoData.FormaDeIngresso.Documento.Randomizar);
  const [nome, setNome] = useState(inscricaoData.FormaDeIngresso.Nome.Valor);
  const [randomizarNome, setRandomizarNome] = useState(inscricaoData.FormaDeIngresso.Nome.Randomizar);
  const [eMail, setEMail] = useState(inscricaoData.FormaDeIngresso.EMail.Valor);
  const [randomizarEMail, setRandomizarEMail] = useState(inscricaoData.FormaDeIngresso.EMail.Randomizar);
  const [validEMail, setValidEMail] = useState(true);
  const [telefone, setTelefone] = useState(FormatarTelefone(inscricaoData.FormaDeIngresso.Telefone.Valor));
  const [randomizarTelefone, setRandomizarTelefone] = useState(inscricaoData.FormaDeIngresso.Telefone.Randomizar);
  const [validTelefone, setValidTelefone] = useState(true);

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
    inscricaoData.FormaDeIngresso.Documento.Valor = '';

    inscricaoData.FormaDeIngresso.TipoDeDocumento = event.target.value;
    setTipoDocumento(event.target.value);
  };

  const handleRandomizarDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setDocumento('');
      inscricaoData.FormaDeIngresso.Documento.Valor = '';
    }

    inscricaoData.FormaDeIngresso.Documento.Randomizar = event.target.checked;
    setRandomizarDocumento(event.target.checked);
  };

  const handleDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replaceAll(/\D/g, '');

    inscricaoData.FormaDeIngresso.Documento.Valor = event.target.value;

    if (tipoDocumento === 'CPF') {
      value = FormatarCPF(value);
    }

    setDocumento(value);
  };

  const handleRandomizarNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setNome('');
      inscricaoData.FormaDeIngresso.Nome.Valor = '';
    }

    inscricaoData.FormaDeIngresso.Nome.Randomizar = event.target.checked;
    setRandomizarNome(event.target.checked);
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nome = event.target.value.replaceAll(/[^\w\sÀ-ÖØ-öø-ÿ]+/g, '').replaceAll(/\d/g, '');

    inscricaoData.FormaDeIngresso.Nome.Valor = nome;
    setNome(nome);
  };

  const handleNomeBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let nome = event.target.value.replaceAll(/ {2,}/g, ' ').trimStart().trimEnd();

    inscricaoData.FormaDeIngresso.Nome.Valor = nome;
    setNome(nome);
  };

  const handleRandomizarEMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setEMail('');
      inscricaoData.FormaDeIngresso.EMail.Valor = '';
      setValidEMail(true);
    }

    inscricaoData.FormaDeIngresso.EMail.Randomizar = event.target.checked;
    setRandomizarEMail(event.target.checked);
  };

  const handleEMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let email = event.target.value.replaceAll(/\s/g, '').trimStart();

    inscricaoData.FormaDeIngresso.EMail.Valor = email;
    setEMail(email);
  };

  const handleEMailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const email = event.target.value.trimEnd();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setValidEMail(emailPattern.test(email))

    inscricaoData.FormaDeIngresso.EMail.Valor = email;
    setEMail(email);
  };

  const handleRandomizarTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTelefone('');
      setValidTelefone(true);
      inscricaoData.FormaDeIngresso.Telefone.Valor = '';
    }

    inscricaoData.FormaDeIngresso.Telefone.Randomizar = event.target.checked;
    setRandomizarTelefone(event.target.checked);
  };

  const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let telefone = event.target.value.replaceAll(/\D/g, '');

    inscricaoData.FormaDeIngresso.Telefone.Valor = telefone;
    setTelefone(FormatarTelefone(telefone));
  };

  const handlTelefoneBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const telefone = event.target.value;
    const telefonePattern10 = /^\(\d{2}\) \d{4}-\d{4}$/;
    const telefonePattern11 = /^\(\d{2}\) \d{5}-\d{4}$/;

    setValidTelefone(telefonePattern10.test(telefone) || telefonePattern11.test(telefone) || telefone === '')
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
          <div style={{ position: 'relative' }}>
            <TextField
              disabled={randomizarTelefone}
              value={telefone}
              onChange={handleTelefoneChange}
              onBlur={handlTelefoneBlur}
              inputProps={{ maxLength: 15 }}
              id="telefone"
              label="Telefone"
              variant="outlined"
              placeholder='(11) 99999-9999'
              autoComplete="off"
              fullWidth
            />
            {!validTelefone && (<span style={{
              position: 'absolute',
              left: '0',
              bottom: '-20px',
              color: '#ff4242',
              fontSize: '10px'
            }}>
              Por favor, digite um telefone válido.
            </span>)}
          </div>
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
    </FormGroup >
  );
}