const express = require('express');
const cors = require('cors');

const categorias = require('./db/categorias');
const compras = require('./db/compras');
const detalleCompras = require('./db/detalleCompras');
const detalleVentas = require('./db/detalleVentas');
const productos = require('./db/productos');
const proveedores = require('./db/proveedores');
const rol = require('./db/rol');
const usuarios = require('./db/usuarios');
const ventas = require('./db/ventas'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/categorias', categorias);
app.use('/compras', compras);
app.use('/detallecompras', detalleCompras);
app.use('/detalleventas', detalleVentas);
app.use('/productos', productos);
app.use('/proveedores', proveedores);
app.use('/rol', rol);
app.use('/usuarios', usuarios);
app.use('/ventas', ventas);

app.listen(3000, () => {
    console.log('Servidor corriendo en -> http://localhost:3000');
});