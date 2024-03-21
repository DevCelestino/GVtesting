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
            estrutura[item] = "Funcionalidade";
          }
          if (item.toLowerCase().endsWith('steps.cs')) {
            estrutura[item] = "Etapa";
          }
          if (item.toLowerCase().endsWith('pageobjects.cs')) {
            estrutura[item] = "Objetos de Página";
          }
        }
    });

    return estrutura;
  } catch (error) {
    console.error('Erro ao ler pastas:', error);
    return {};
  }
}

module.exports = lerFuncionalidades;
