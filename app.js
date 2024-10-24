// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarios');
const productoRoutes = require('./routes/productos');
const resenaRoutes = require('./routes/resena');
const contactoRoutes = require('./routes/contact');
const pedidoRoutes = require('./routes/pedidos');
const detallePedidoRoutes = require('./routes/detallePedido');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/resenas', resenaRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/detalles_pedido', detallePedidoRoutes);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
