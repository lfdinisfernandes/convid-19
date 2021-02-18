const express = require('express');
const router = express.Router();

router.use('/preenche-dados', require('./dados'));
router.use('/covid/cidade', require('./cidade'));
router.use('/buscar/dados', require('./buscas'));

module.exports = router;
