// routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../upload');
const { crearProducto, obtenerProductos, obtenerProductosTipo,editarProducto } = require('../controllers/productoController');

router.post('/',  upload.single('imagen_url'), crearProducto);
router.get('/', obtenerProductos);
//router.get('/:tipo', obtenerProductosTipo);
router.put('/:id', editarProducto);

module.exports = router;
