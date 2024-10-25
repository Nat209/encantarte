// controllers/productoController.js
const db = require('../config/db');

const crearProducto = (req, res) => {
    const { nombre, descripcion, precio, tipo, stock } = req.body;
    const imagen_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null; // Cambia el puerto si es necesario

    const query = 'INSERT INTO productos (nombre, descripcion, precio, tipo, imagen_url, stock) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, precio, tipo, imagen_url, stock], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el producto', error: err });
        }
        res.status(201).json({ id: results.insertId, nombre, descripcion, precio, tipo, imagen_url, stock });
    });
};


const obtenerProductos = (req, res) => {
    const tipo = req.query.tipo; // Obtener el tipo de la consulta

    let query = 'SELECT * FROM productos';
    const queryParams = [];

    // Si hay un tipo especificado, ajustar la consulta
    if (tipo) {
        query += ' WHERE tipo = ?';
        queryParams.push(tipo);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener productos', error: err });
        }
        res.json(results);
    });
};



const editarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, tipo, stock } = req.body;

    // Validación básica
    if (!nombre || !descripcion || !precio || !tipo || stock === undefined) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const query = 'UPDATE productos SET nombre=?, descripcion=?, precio=?, tipo=?, stock=? WHERE id=?';
    
    db.query(query, [nombre, descripcion, precio, tipo, stock, id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el producto', error: err });
        }

        // Verificar si se actualizó algún registro
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado correctamente', producto: { nombre, descripcion, precio, tipo, stock } });
    });
};



module.exports = {
    crearProducto,
    obtenerProductos,
    editarProducto,
    //obtenerProductosTipo

};
