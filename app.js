const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productosRouter');
const usuariosRoutes = require('./routes/usuariosRouter');
const categoriasRouter = require('./routes/categoriasRouter');
const proveedoresRouter = require('./routes/proveedoresRouter');
const rolRouter = require('./routes/rolRouter');
const ventasRouter = require('./routes/ventasRouter');
const detalleventasRouter = require('./routes/detalleventasRouter');
const detalleventaRouter = require('./routes/detalleventasRouter');
const errorHandler = require('./middlewares/errorHandler');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/categorias', categoriasRouter);
app.use('/proveedores', proveedoresRouter);
app.use('/rol', rolRouter);
app.use('/ventas', ventasRouter);
app.use('/detalleventas', detalleventasRouter);
app.use('/detalleventa/venta/:id_venta', detalleventasRouter);

app.use(errorHandler);

module.exports = app;
