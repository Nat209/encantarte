// routes/resenaRoutes.js
const express = require('express');
const router = express.Router();
const { crearResena, obtenerResenasPorProducto } = require('../controllers/resenaController');

router.post('/', crearResena);
router.get('/:producto_id', obtenerResenasPorProducto);

module.exports = router;
