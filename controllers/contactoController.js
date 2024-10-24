const db = require('../config/db');

const crearContacto = (req, res) => {
    const { nombre, email, mensaje } = req.body;

    const query = 'INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)';
    db.query(query, [nombre, email, mensaje], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al enviar el mensaje', error: err });
        }
        res.status(201).json({ id: results.insertId, nombre, email, mensaje });
    });
};

module.exports = {
    crearContacto,
};
