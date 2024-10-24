// routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const { crearProducto, obtenerProductos, editarProducto } = require('../controllers/productoController');

router.post('/', crearProducto);
router.get('/', obtenerProductos);
router.put('/:id', editarProducto);

module.exports = router;
