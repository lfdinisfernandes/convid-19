const express = require('express');
const router = express.Router();

router.use('/preenche-dados', require('./rotas/colocardados/dados'));
router.use('/covid/cidade', require('./rotas/cidade'));
router.use('/buscar/dados', require('./rotas/buscas'));

module.exports = router;
