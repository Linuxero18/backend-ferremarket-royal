const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const categoriasRouter = require('./routes/categoriasRouter');
const proveedoresRouter = require('./routes/proveedoresRouter');
const rolRouter = require('./routes/rolRouter');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/categorias', categoriasRouter);
app.use('/proveedores', proveedoresRouter);
app.use('/rol', rolRouter);

app.use(errorHandler);

module.exports = app;
