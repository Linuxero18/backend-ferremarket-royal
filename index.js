const express = require('express');
const cors = require('cors');

const productosRoutes = require('./db/productos');
const comprasRoutes = require('./db/compras');
const detalleComprasRoutes = require('./db/detallecompras.js');
const detalleVentasRoutes = require('./db/detalleVentas');
const proveedoresRoutes = require('./db/proveedores');
const rolRoutes = require('./db/rol');
const usuariosRoutes = require('./db/usuarios');
const ventasRoutes = require('./db/ventas');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/productos", productosRoutes);
app.use("/compras", comprasRoutes);
app.use("/detalleCompras", detalleComprasRoutes);
app.use("/detalleVentas", detalleVentasRoutes);
app.use("/proveedores", proveedoresRoutes);
app.use("/rol", rolRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/ventas", ventasRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en -> http://localhost:3000');
});