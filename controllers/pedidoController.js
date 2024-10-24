const db = require('../config/db');

// Obtener todos los pedidos
exports.getPedidos = (req, res) => {
    db.query('SELECT * FROM pedidos', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// Obtener un pedido por ID
exports.getPedidoById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM pedidos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.json(results[0]);
    });
};

// Crear un nuevo pedido
exports.createPedido = (req, res) => {
    const { usuario_id, estado, total } = req.body;
    db.query('INSERT INTO pedidos (usuario_id, estado, total) VALUES (?, ?, ?)', [usuario_id, estado, total], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, usuario_id, estado, total });
    });
};

// Actualizar un pedido
exports.updatePedido = (req, res) => {
    const { id } = req.params;
    const { estado, total } = req.body;
    db.query('UPDATE pedidos SET estado = ?, total = ? WHERE id = ?', [estado, total, id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.json({ message: 'Pedido actualizado' });
    });
};

// Eliminar un pedido
exports.deletePedido = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pedidos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.json({ message: 'Pedido eliminado' });
    });
};
