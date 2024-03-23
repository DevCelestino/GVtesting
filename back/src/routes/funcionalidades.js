const express = require('express');
const router = express.Router();
const lerFuncionalidades = require('../controllers/funcionalidadesController.js');
const { globalEnv } = require('../config');

router.get('/', (req, res) => {
    const estrutura = lerFuncionalidades(globalEnv.PATH_TESTES);
    res.send(estrutura);
});

module.exports = router;
