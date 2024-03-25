const fs = require('fs');
const os = require('os');
const path = require('path');

function lerInscricaoConfig() {
  try {
    const username = os.userInfo().username;
    const gvTestingPath = path.join('C:', 'Users', username, 'Documents', 'GVtesting');

    if (!fs.existsSync(gvTestingPath)) {
      fs.mkdirSync(gvTestingPath, { recursive: true });
    }

    const inscricaoConfigPath = path.join(gvTestingPath, 'Inscricao.json');

    if (!fs.existsSync(gvTestingPath)) {
      fs.mkdirSync(gvTestingPath, { recursive: true });
    }

    if (fs.existsSync(inscricaoConfigPath)) {
      const sourceJson = JSON.parse(fs.readFileSync('./src/templates/Inscricao.json', 'utf8'));
      const targetJson = JSON.parse(fs.readFileSync(inscricaoConfigPath, 'utf-8'));

      function mergeAndClean(target, source) {
        Object.keys(source).forEach(key => {
          if (!target.hasOwnProperty(key)) {
            target[key] = source[key];
          } else if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
            mergeAndClean(target[key], source[key]);
          }
        });

        Object.keys(target).forEach(key => {
          if (!source.hasOwnProperty(key)) {
            delete target[key];
          } else if (typeof target[key] === 'object' && target[key] !== null && !Array.isArray(target[key])) {
            mergeAndClean(target[key], source[key]);
          }
        });
      }
      
      mergeAndClean(targetJson, sourceJson);

      fs.writeFileSync(inscricaoConfigPath, JSON.stringify(targetJson, null, 2), 'utf-8');
    }
    if (!fs.existsSync(inscricaoConfigPath)) {
      const sourceJson = fs.readFileSync('./src/templates/Inscricao.json', 'utf8');
      fs.writeFileSync(inscricaoConfigPath, sourceJson);
    }

    const data = fs.readFileSync(inscricaoConfigPath, 'utf8');

    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler as configurações da ferramenta de Inscricao:', error);
    return {};
  }
}

module.exports = lerInscricaoConfig;
