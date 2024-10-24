// controllers/resenaController.js
const db = require('../config/db');

const crearResena = (req, res) => {
    const { producto_id, usuario_id, calificacion, comentario } = req.body;

    const query = 'INSERT INTO resenas (producto_id, usuario_id, calificacion, comentario) VALUES (?, ?, ?, ?)';
    db.query(query, [producto_id, usuario_id, calificacion, comentario], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear la reseña', error: err });
        }
        res.status(201).json({ id: results.insertId, producto_id, usuario_id, calificacion, comentario });
    });
};

const obtenerResenasPorProducto = (req, res) => {
    const { producto_id } = req.params;

    const query = 'SELECT * FROM resenas WHERE producto_id = ?';
    db.query(query, [producto_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener reseñas', error: err });
        }
        res.json(results);
    });
};

module.exports = {
    crearResena,
    obtenerResenasPorProducto,
};
