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

    if (!fs.existsSync(inscricaoConfigPath)) {
      const templateData = fs.readFileSync('./src/templates/Inscricao.json', 'utf8');
      fs.writeFileSync(inscricaoConfigPath, templateData);
    }

    const data = fs.readFileSync(inscricaoConfigPath, 'utf8');
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler as configurações da ferramenta de Inscricao:', error);
    return {};
  }
}

module.exports = lerInscricaoConfig;
