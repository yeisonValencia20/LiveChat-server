
const { Router } = require('express');

const { mensajeInicio } = require('../controllers/home');

const router = Router();

router.get('/', mensajeInicio);

module.exports = router;