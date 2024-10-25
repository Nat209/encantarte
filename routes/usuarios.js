// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const { crearUsuario, autenticarUsuario, obtenerUsuarios } = require('../controllers/usuarioController');

router.post('/registro', crearUsuario);
router.post('/login', autenticarUsuario);
router.get('/consult', obtenerUsuarios)

module.exports = router;
