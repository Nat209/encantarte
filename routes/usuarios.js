// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const { crearUsuario, autenticarUsuario } = require('../controllers/usuarioController');

router.post('/registro', crearUsuario);
router.post('/login', autenticarUsuario);

module.exports = router;
