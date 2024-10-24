const db = require('../config/db');

// Obtener todos los detalles de pedidos
exports.getDetallesPedido = (req, res) => {
    db.query('SELECT * FROM detalles_pedido', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// Obtener un detalle de pedido por ID
exports.getDetallePedidoById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM detalles_pedido WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        res.json(results[0]);
    });
};

// Crear un nuevo detalle de pedido
exports.createDetallePedido = (req, res) => {
    const { pedido_id, producto_id, cantidad, precio } = req.body;
    db.query('INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)', 
        [pedido_id, producto_id, cantidad, precio], (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ id: results.insertId, pedido_id, producto_id, cantidad, precio });
        });
};

// Actualizar un detalle de pedido
exports.updateDetallePedido = (req, res) => {
    const { id } = req.params;
    const { cantidad, precio } = req.body;
    db.query('UPDATE detalles_pedido SET cantidad = ?, precio = ? WHERE id = ?', 
        [cantidad, precio, id], (err, results) => {
            if (err) return res.status(500).json({ error: err });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
            res.json({ message: 'Detalle de pedido actualizado' });
        });
};

// Eliminar un detalle de pedido
exports.deleteDetallePedido = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM detalles_pedido WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        res.json({ message: 'Detalle de pedido eliminado' });
    });
};
