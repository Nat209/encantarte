// db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'rooot',  // Cambia esto
    password: process.env.DB_PASSWORD || '',  // Cambia esto
    database: process.env.DB_NAME || 'tienda_amigurumi',  // Cambia esto
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
