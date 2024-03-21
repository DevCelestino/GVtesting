const fs = require('fs');
const path = require('path');

function lerFuncionalidades(caminho) {
  try {
    const estrutura = {};
    const itens = fs.readdirSync(caminho);

    itens.forEach(item => {
      const itemCaminho = path.join(caminho, item);

      if (item)
        if (fs.statSync(itemCaminho).isDirectory()) {
          estrutura[item] = lerFuncionalidades(itemCaminho);
        } else {
          if (item.toLowerCase().endsWith('.feature')) {
            estrutura[item] = { 'Caminho': itemCaminho };
            estrutura[item].Cenarios = lerCenarios(itemCaminho);
          }
          if (item.toLowerCase().endsWith('steps.cs')) {
            estrutura[item] = { 'Caminho': itemCaminho };
            estrutura[item].Etapas = lerEtapas(itemCaminho);
          }
          if (item.toLowerCase().endsWith('pageobjects.cs')) {
            estrutura[item] = { 'Caminho': itemCaminho };
            estrutura[item].Objetos = lerObjetosDePagina(itemCaminho);
          }
        }
    });

    return estrutura;
  } catch (error) {
    console.error('Erro ao ler pastas:', error);
    return {};
  }
}

function lerCenarios(caminho) {
  try {
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    const linhas = conteudo.split('\r\n');
    const cenarios = linhas
      .filter(linha => linha.includes('Cenário: '))
      .map(linha => linha.replace('Cenário: ', ''));

    return cenarios;
  } catch (error) {
    console.error('Erro ao ler o arquivo feature:', error);
    return {};
  }
}

function lerEtapas(caminho) {
  try {
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    const linhas = conteudo.split('\r\n');
    const etapas = linhas
      .filter(linha => linha.includes('[Given(') || linha.includes('[When(') || linha.includes('[Then('))
      .map(linha => linha.trimStart());

    return etapas;
  } catch (error) {
    console.error('Erro ao ler o arquivo de steps:', error);
    return {};
  }
}

function lerObjetosDePagina(caminho) {
  try {
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    const linhas = conteudo.split('\r\n');
    const objetos = [];

    for (let i = 0; i < linhas.length; i++) {
      const linhaAtual = linhas[i];

      if (linhaAtual.includes('[FindsBy')) {
        const novaString = (linhaAtual + '\r\n' + linhas[i + 1])
          .trimStart()
          .replace(/\r\n\s*public/g, '\r\npublic');
        objetos.push(novaString);
      }
    }

    return objetos;
  } catch (error) {
    console.error('Erro ao ler o arquivo de pageobjects:', error);
    return {};
  }
}

module.exports = lerFuncionalidades;
