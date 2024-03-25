const express = require('express');
const router = express.Router();
const lerInscricaoConfig = require('../controllers/inscricaoController.js');

router.get('/inscricao', (req, res) => {
    try {
        const data = lerInscricaoConfig();
        res.send(data);
    } catch {
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = router;
