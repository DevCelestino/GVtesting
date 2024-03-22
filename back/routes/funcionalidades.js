const express = require('express');
const router = express.Router();
const lerFuncionalidades = require('../controllers/funcionalidadesController.js');

router.get('/', (req, res) => {
    const estrutura = lerFuncionalidades('C:/Testes');
    res.send(estrutura);
});

module.exports = router;
