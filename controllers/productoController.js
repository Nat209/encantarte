// controllers/productoController.js
const db = require('../config/db');

const crearProducto = (req, res) => {
    const { nombre, descripcion, precio, tipo, imagen_url,stock } = req.body;

    const query = 'INSERT INTO productos (nombre, descripcion, precio, tipo, imagen_url) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, precio, tipo, imagen_url,stock], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el producto', error: err });
        }
        res.status(201).json({ id: results.insertId, nombre, descripcion, precio, tipo, imagen_url,stock });
    });
};

const obtenerProductos = (req, res) => {
    const query = 'SELECT * FROM productos';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener productos', error: err });
        }
        res.json(results);
    });
};

const editarProducto = (req, res) => {
    
    const { id } = req.params;
    const { nombre, descripcion, precio, tipo, imagen_url,stock } = req.body;
    console.log(id)
    const query = 'UPDATE  productos SET nombre=?, descripcion=?, precio=?, tipo=?, imagen_url=?, stock=? WHERE id=?';
    db.query(query, [nombre, descripcion, precio, tipo, imagen_url,stock,id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el producto', error: err });
        }
        res.status(201).json({ nombre, descripcion, precio, tipo, imagen_url,stock });
    });
};


module.exports = {
    crearProducto,
    obtenerProductos,
    editarProducto,
};
