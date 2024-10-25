// controllers/usuarioController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const crearUsuario = (req, res) => {
    const { nombre, email, password, rol } = req.body;

    // Encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

          // Validar el rol si se especifica, asignar 'cliente' como predeterminado
          const validRoles = ['admin', 'cliente'];
          const userRole = validRoles.includes(rol) ? rol : 'cliente'; // Asigna 'cliente' por defecto

    const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, email, hashedPassword, userRole], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el usuario', error: err });
        }
        res.status(201).json({ id: results.insertId, nombre, email, rol });
    });
};

const obtenerUsuarios = (req, res) => {
    const rol = req.query.rol; // Obtener el tipo de la consulta

    let query = 'SELECT id, nombre, email FROM usuarios';
    const queryParams = [];

    // Si hay un tipo especificado, ajustar la consulta
    if (rol) {
        query += ' WHERE rol = ?';
        queryParams.push(rol);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener productos', error: err });
        }
        res.json(results);
    });
};

const autenticarUsuario = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const usuario = results[0];
        const passwordMatch = bcrypt.compareSync(password, usuario.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, 'secret', { expiresIn: '1h' });
        res.json({ token, usuario });
    });
};

module.exports = {
    crearUsuario,
    autenticarUsuario,
    obtenerUsuarios
};
