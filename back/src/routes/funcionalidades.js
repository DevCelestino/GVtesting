const express = require('express');
const router = express.Router();
const lerFuncionalidades = require('../controllers/funcionalidadesController.js');
const { globalEnv } = require('../config');

router.get('/', (req, res) => {
    try {
        const estrutura = lerFuncionalidades(globalEnv.PATH_TESTES);
        res.send(estrutura);
    } catch {
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = router;
